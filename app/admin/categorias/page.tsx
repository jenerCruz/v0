'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminNavbar } from '@/components/AdminNavbar'
import { Category } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    is_active: true,
  })

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

    fetchCategories()
  }

  const fetchCategories = async () => {
    try {
      const supabase = createClient()

      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })

      if (data) {
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const supabase = createClient()

    try {
      if (editingId) {
        const { error } = await supabase
          .from('categories')
          .update({
            name: formData.name,
            description: formData.description,
            image_url: formData.image_url,
            is_active: formData.is_active,
          })
          .eq('id', editingId)

        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert({
          name: formData.name,
          description: formData.description,
          image_url: formData.image_url,
          is_active: formData.is_active,
          sort_order: categories.length,
        })

        if (error) throw error
      }

      setFormData({
        name: '',
        description: '',
        image_url: '',
        is_active: true,
      })
      setShowForm(false)
      setEditingId(null)
      fetchCategories()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Error al guardar la categoría')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro que deseas eliminar esta categoría?')) return

    const supabase = createClient()

    try {
      const { error } = await supabase.from('categories').delete().eq('id', id)

      if (error) throw error

      fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Error al eliminar la categoría')
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
            <h1 className="text-3xl font-bold text-white">Gestionar Categorías</h1>
            <p className="text-slate-400 mt-1">
              Total de categorías: {categories.length}
            </p>
          </motion.div>

          <Button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({
                name: '',
                description: '',
                image_url: '',
                is_active: true,
              })
            }}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {showForm ? 'Cancelar' : '+ Nueva Categoría'}
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
                  Nombre de la Categoría
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ej: Tazas"
                  className="bg-white/5 border-white/20 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  URL de la Imagen
                </label>
                <Input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="bg-white/5 border-white/20 text-white"
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
                  placeholder="Describe la categoría..."
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 placeholder:text-slate-500"
                  rows={3}
                />
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
                  Activa
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
            >
              {editingId ? 'Actualizar Categoría' : 'Crear Categoría'}
            </Button>
          </motion.form>
        )}

        {/* Lista de categorías */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all"
              >
                {category.image_url && (
                  <div className="relative h-40 bg-slate-700">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setEditingId(category.id)
                        setFormData({
                          name: category.name,
                          description: category.description || '',
                          image_url: category.image_url || '',
                          is_active: category.is_active,
                        })
                        setShowForm(true)
                      }}
                      className="flex-1 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/30 text-sm"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(category.id)}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 text-sm"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No hay categorías aún</p>
          </div>
        )}
      </main>
    </div>
  )
}
