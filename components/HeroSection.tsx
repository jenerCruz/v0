'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Título principal con animación */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
        >
          Productos Sublimables
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mt-2">
            De Calidad Premium
          </span>
        </motion.h2>

        {/* Descripción con animación retrasada */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto mb-8"
        >
          Descubre nuestra colección exclusiva de productos personalizables para
          sublimación. Calidad garantizada, precios competitivos y entrega rápida
          a todo el país.
        </motion.p>

        {/* Botones de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#productos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Explorar Productos
          </motion.a>
          <motion.a
            href="#categorias"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-white/10 text-white font-semibold rounded-lg transition-all"
          >
            Ver Categorías
          </motion.a>
        </motion.div>

        {/* Stats flotantes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2"
            >
              1K+
            </motion.p>
            <p className="text-slate-400 text-sm">Clientes Satisfechos</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2"
            >
              500+
            </motion.p>
            <p className="text-slate-400 text-sm">Productos</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-green-400 mb-2"
            >
              24h
            </motion.p>
            <p className="text-slate-400 text-sm">Envío Rápido</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
