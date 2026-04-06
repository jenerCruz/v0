'use client'

import { Category } from '@/lib/types'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  if (categories.length === 0) return null

  return (
    <section className="py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
          Nuestras Categorías
        </h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto">
          Explora nuestros productos organizados por categoría
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: (index % 4) * 0.1,
              duration: 0.4,
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="group relative h-48 sm:h-56 rounded-xl overflow-hidden cursor-pointer"
          >
            {/* Imagen de fondo */}
            {category.image_url ? (
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800" />
            )}

            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Contenido */}
            <div className="absolute inset-0 flex items-end p-4 sm:p-6">
              <div className="w-full">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-slate-300 text-sm line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </div>

            {/* Badge hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full"
            >
              Ver más
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
