'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { requestPasswordReset, type PasswordResetRequestState } from '../actions';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-[1.02]"
    >
      {pending ? 'Enviando...' : 'Enviar enlace de restablecimiento'}
    </button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState<PasswordResetRequestState, FormData>(
    requestPasswordReset,
    { status: 'idle' }
  );
  const router = useRouter();

  if (state.status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Email enviado!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Hemos enviado un enlace de restablecimiento a tu correo electrónico. 
              Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Volver al inicio de sesión
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿No recibiste el email? Revisa tu carpeta de spam o intenta nuevamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.push('/login')}
              className="mr-3 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              ¿Olvidaste tu contraseña?
            </h1>
          </div>

          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <Mail className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No te preocupes, ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                placeholder="tu@email.com"
              />
            </div>

            {state.status === 'user_not_found' && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400 rounded-md">
                No encontramos una cuenta con ese email. Verifica que sea correcto o regístrate.
              </div>
            )}

            {state.status === 'failed' && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 rounded-md">
                Error al enviar el email. Por favor, intenta nuevamente.
              </div>
            )}

            {state.status === 'invalid_data' && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 rounded-md">
                Por favor, ingresa un email válido.
              </div>
            )}

            <SubmitButton />
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Recordaste tu contraseña?{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}