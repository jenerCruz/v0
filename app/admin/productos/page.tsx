'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminNavbar } from '@/components/AdminNavbar'
import { ProductWithImages } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_featured: false,
    is_active: true,
  })
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    checkAuth()
  }, [router])

  const checkAuth = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    fetchProducts()
  }

  const fetchProducts = async () => {
    try {
      const supabase = createClient()

      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (productsData) {
        const productsWithImages = await Promise.all(
          productsData.map(async (product) => {
            const { data: images } = await supabase
              .from('product_images')
              .select('*')
              .eq('product_id', product.id)

            return {
              ...product,
              images: images || [],
            }
          })
        )

        setProducts(productsWithImages)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const supabase = createClient()

    try {
      if (editingId) {
        // Actualizar producto
        const { error } = await supabase
          .from('products')
          .update({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category_id: formData.category_id || null,
            is_featured: formData.is_featured,
            is_active: formData.is_active,
          })
          .eq('id', editingId)

        if (error) throw error
      } else {
        // Crear nuevo producto
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category_id: formData.category_id || null,
            is_featured: formData.is_featured,
            is_active: formData.is_active,
          })
          .select()
          .single()

        if (error) throw error

        // Agregar imagen si se proporcionó
        if (newProduct && imageUrl) {
          await supabase.from('product_images').insert({
            product_id: newProduct.id,
            image_url: imageUrl,
            is_primary: true,
          })
        }
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        is_featured: false,
        is_active: true,
      })
      setImageUrl('')
      setShowForm(false)
      setEditingId(null)
      fetchProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error al guardar el producto')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro que deseas eliminar este producto?')) return

    const supabase = createClient()

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)

      if (error) throw error

      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error al eliminar el producto')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-white">Gestionar Productos</h1>
            <p className="text-slate-400 mt-1">
              Total de productos: {products.length}
            </p>
          </motion.div>

          <Button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({
                name: '',
                description: '',
                price: '',
                category_id: '',
                is_featured: false,
                is_active: true,
              })
            }}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {showForm ? 'Cancelar' : '+ Nuevo Producto'}
          </Button>
        </div>

        {/* Formulario */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nombre del Producto
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ej: Taza Sublimable"
                  className="bg-white/5 border-white/20 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Precio
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0.00"
                  className="bg-white/5 border-white/20 text-white"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe el producto..."
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 placeholder:text-slate-500"
                  rows={3}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  URL de Imagen Principal
                </label>
                <Input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  Destacado
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_active: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  Activo
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
            >
              {editingId ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </motion.form>
        )}

        {/* Lista de productos */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  <p className="text-slate-400 text-sm">
                    Precio: ${product.price.toFixed(2)} • Imágenes:{' '}
                    {product.images?.length || 0}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setEditingId(product.id)
                      setFormData({
                        name: product.name,
                        description: product.description || '',
                        price: product.price.toString(),
                        category_id: product.category_id || '',
                        is_featured: product.is_featured,
                        is_active: product.is_active,
                      })
                      setShowForm(true)
                    }}
                    className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/30"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30"
                  >
                    Eliminar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No hay productos aún</p>
          </div>
        )}
      </main>
    </div>
  )
}
