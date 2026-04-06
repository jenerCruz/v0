'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminNavbar } from '@/components/AdminNavbar'
import { StoreConfig } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const router = useRouter()
  const [config, setConfig] = useState<StoreConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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

    fetchConfig()
  }

  const fetchConfig = async () => {
    try {
      const supabase = createClient()

      const { data } = await supabase
        .from('store_config')
        .select('*')
        .limit(1)
        .single()

      if (data) {
        setConfig(data)
      }
    } catch (error) {
      console.error('Error fetching config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!config) return

    setSaving(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('store_config')
        .update({
          store_name: config.store_name,
          whatsapp_number: config.whatsapp_number,
          whatsapp_message: config.whatsapp_message,
          logo_url: config.logo_url,
          banner_url: config.banner_url,
        })
        .eq('id', config.id)

      if (error) throw error

      alert('Configuración guardada correctamente')
    } catch (error) {
      console.error('Error saving config:', error)
      alert('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <AdminNavbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Configuración</h1>
          <p className="text-slate-400 mt-1">
            Configura tu tienda y WhatsApp
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : config ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl p-8"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSave()
              }}
              className="space-y-6"
            >
              {/* Información de la Tienda */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Información de la Tienda
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nombre de la Tienda
                    </label>
                    <Input
                      type="text"
                      value={config.store_name}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          store_name: e.target.value,
                        })
                      }
                      placeholder="Mi Tienda"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      URL del Logo
                    </label>
                    <Input
                      type="url"
                      value={config.logo_url || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          logo_url: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      URL del Banner
                    </label>
                    <Input
                      type="url"
                      value={config.banner_url || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          banner_url: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Configuración de WhatsApp */}
              <div className="border-t border-white/10 pt-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Configuración de WhatsApp
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Número de WhatsApp (sin espacios ni caracteres especiales)
                    </label>
                    <Input
                      type="tel"
                      value={config.whatsapp_number}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          whatsapp_number: e.target.value,
                        })
                      }
                      placeholder="5491234567890"
                      className="bg-white/5 border-white/20 text-white"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Formato: 1 código de país + 10 dígitos. Ej: 5491234567890
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Mensaje Predeterminado
                    </label>
                    <textarea
                      value={config.whatsapp_message}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          whatsapp_message: e.target.value,
                        })
                      }
                      placeholder="Hola! Me interesa este producto:"
                      className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 placeholder:text-slate-500"
                      rows={3}
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Este mensaje se enviará con el nombre y precio del producto
                    </p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-sm text-blue-300">
                      <strong>Nota:</strong> Los números de WhatsApp deben incluir el
                      código de país (sin símbolo +). Por ejemplo, para Argentina:
                      549 (código) + número de teléfono.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-green-500 hover:bg-green-600 h-11"
                >
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
                <Button
                  type="button"
                  onClick={() => fetchConfig()}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 h-11"
                >
                  Descartar
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <p>No se pudo cargar la configuración</p>
          </div>
        )}
      </main>
    </div>
  )
}
