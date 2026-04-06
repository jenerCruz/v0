'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminNavbar } from '@/components/AdminNavbar'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)

      try {
        // Obtener estadísticas
        const { count: productCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })

        const { count: categoryCount } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true })

        setStats({
          products: productCount || 0,
          categories: categoryCount || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-slate-400">
                Bienvenido, {user?.email}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Total de Productos</p>
                    <p className="text-4xl font-bold text-blue-400">
                      {stats.products}
                    </p>
                  </div>
                  <div className="text-4xl">📦</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Categorías</p>
                    <p className="text-4xl font-bold text-purple-400">
                      {stats.categories}
                    </p>
                  </div>
                  <div className="text-4xl">📁</div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Acciones Rápidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/admin/productos"
                  className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-all text-center"
                >
                  <p className="text-2xl mb-2">📦</p>
                  <p className="text-white font-semibold text-sm">Gestionar Productos</p>
                </a>
                <a
                  href="/admin/categorias"
                  className="p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-all text-center"
                >
                  <p className="text-2xl mb-2">📁</p>
                  <p className="text-white font-semibold text-sm">Gestionar Categorías</p>
                </a>
                <a
                  href="/admin/configuracion"
                  className="p-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-lg transition-all text-center"
                >
                  <p className="text-2xl mb-2">⚙️</p>
                  <p className="text-white font-semibold text-sm">Configuración</p>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </main>
    </div>
  )
}
