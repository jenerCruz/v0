'use client'

import { ProductWithImages } from '@/lib/types'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: ProductWithImages
  whatsappNumber: string
  whatsappMessage: string
  index: number
}

export function ProductCard({
  product,
  whatsappNumber,
  whatsappMessage,
  index,
}: ProductCardProps) {
  const primaryImage = product.images?.find((img) => img.is_primary) ||
    product.images?.[0] || {
      image_url: 'https://images.unsplash.com/photo-1524634126265-b5b41a91c5fb?w=500&h=500&fit=crop',
    }

  const handleWhatsApp = () => {
    const message = `${whatsappMessage} ${product.name} - $${product.price}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  // Determinar tamaño del card basado en índice (efecto masonry)
  const sizeClasses = [
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
    'col-span-1 row-span-2',
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
  ][index % 5]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: (index % 5) * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      className={`${sizeClasses} group`}
    >
      <div className="relative h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20">
        {/* Imagen con overlay */}
        <div className="relative w-full h-64 sm:h-80 overflow-hidden">
          <Image
            src={primaryImage.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Contenido */}
        <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
          {/* Título y descripción */}
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-slate-400 text-sm line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          {/* Precio y botón */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-blue-400">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.999 1.526v.465c0 2.289 1.775 4.505 4.366 4.627.529.073 1.046-.16 1.57-.455l-.157-.89c-.203 1.096-.789 2.055-1.608 2.784-.04.034-.08.067-.12.102-.742.667-1.722 1.068-2.82 1.068-.46 0-.898-.084-1.313-.248 1.146.766 2.39 1.218 3.744 1.218 4.59 0 8.32-3.731 8.32-8.32v-.465c-.31-.299-.757-.463-1.228-.463-.597 0-1.15.278-1.51.708l-.002-.002z" />
              </svg>
              Consultar
            </motion.button>
          </div>
        </div>

        {/* Badge featured */}
        {product.is_featured && (
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded-full">
              Destacado
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
