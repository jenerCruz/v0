'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">¡Cuenta Creada!</h1>
          <p className="text-slate-300 mb-6">
            Se ha enviado un correo de confirmación. Por favor revisa tu bandeja de entrada para verificar tu email.
          </p>

          <p className="text-slate-400 text-sm mb-8">
            Una vez confirmes tu email, podrás iniciar sesión y realizar compras.
          </p>

          <Link href="/login">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold h-11 rounded-lg">
              Ir a Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}