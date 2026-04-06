import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-white mb-2">SubliStore</h1>
          <p className="text-slate-300 mb-8">Registro de Administradores</p>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
            <p className="text-orange-300 text-sm">
              El registro de administradores es por invitación única. 
              Contacta al administrador del sistema para obtener acceso.
            </p>
          </div>

          <Link href="/auth/login">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold h-11 rounded-lg">
              Volver al Login
            </Button>
          </Link>

          <p className="text-center text-slate-400 text-sm mt-6">
            ¿Eres usuario?{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300">
              Crear cuenta de usuario
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
