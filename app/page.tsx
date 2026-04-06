'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ProductWithImages, StoreConfig, Category } from '@/lib/types'
import { ProductCard } from '@/components/ProductCard'
import { HeroSection } from '@/components/HeroSection'
import { CategoriesSection } from '@/components/CategoriesSection'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [config, setConfig] = useState<StoreConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()

        // Obtener configuración de la tienda
        const { data: configData } = await supabase
          .from('store_config')
          .select('*')
          .limit(1)
          .single()

        if (configData) {
          setConfig(configData)
        }

        // Obtener categorías
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (categoriesData) {
          setCategories(categoriesData)
        }

        // Obtener productos con imágenes
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (productsData) {
          // Obtener imágenes para cada producto
          const productsWithImages = await Promise.all(
            productsData.map(async (product) => {
              const { data: images } = await supabase
                .from('product_images')
                .select('*')
                .eq('product_id', product.id)
                .order('sort_order', { ascending: true })

              return {
                ...product,
                images: images || [],
              }
            })
          )

          setProducts(productsWithImages)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {config?.store_name || 'SubliStore'}
              </h1>
              <p className="text-xs text-slate-400">Productos Sublimables</p>
            </div>
          </motion.div>

          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg border border-white/10 transition-all"
            >
              Admin
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </section>

      {/* Categorías Section */}
      <section id="categorias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoriesSection categories={categories} />
      </section>

      {/* Productos Section */}
      <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nuestros Productos
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Selecciona entre nuestra amplia variedad de productos sublimables
          </p>
        </motion.div>

        {/* Grid de productos */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-4 sm:gap-6 mb-20">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={config?.whatsapp_number || ''}
                whatsappMessage={
                  config?.whatsapp_message || 'Hola! Me interesa este producto:'
                }
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-slate-400 text-lg">
              No hay productos disponibles aún
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400 text-sm">
            <p>
              © 2024 {config?.store_name || 'SubliStore'}. Todos los derechos reservados.
            </p>
            {config?.whatsapp_number && (
              <a
                href={`https://wa.me/${config.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-all"
              >
                Contactar por WhatsApp
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      {config?.whatsapp_number && (
        <WhatsAppButton
          phoneNumber={config.whatsapp_number}
          message={config.whatsapp_message || 'Hola! Me interesa conocer más sobre tus productos'}
        />
      )}
    </div>
  )
}
