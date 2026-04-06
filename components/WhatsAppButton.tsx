'use client'

import { motion } from 'framer-motion'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export function WhatsAppButton({ phoneNumber, message = 'Hola! Me gustaría conocer más sobre tus productos' }: WhatsAppButtonProps) {
  if (!phoneNumber) return null

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-full shadow-lg hover:shadow-green-500/50 flex items-center justify-center transition-all duration-300"
    >
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.999 1.526v.465c0 2.289 1.775 4.505 4.366 4.627.529.073 1.046-.16 1.57-.455l-.157-.89c-.203 1.096-.789 2.055-1.608 2.784-.04.034-.08.067-.12.102-.742.667-1.722 1.068-2.82 1.068-.46 0-.898-.084-1.313-.248 1.146.766 2.39 1.218 3.744 1.218 4.59 0 8.32-3.731 8.32-8.32v-.465c-.31-.299-.757-.463-1.228-.463-.597 0-1.15.278-1.51.708l-.002-.002z" />
      </svg>
    </motion.button>
  )
}
