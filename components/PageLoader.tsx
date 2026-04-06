'use client'

import { motion } from 'framer-motion'

export function PageLoader() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {/* Logo animado */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
          >
            <span className="text-white font-bold text-2xl">S</span>
          </motion.div>
        </motion.div>

        {/* Texto */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-white mb-4"
        >
          SubliStore
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-slate-400 mb-8"
        >
          Cargando...
        </motion.p>

        {/* Skeleton loaders */}
        <motion.div
          variants={itemVariants}
          className="space-y-3"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full w-48 mx-auto"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="h-2 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full w-32 mx-auto"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
