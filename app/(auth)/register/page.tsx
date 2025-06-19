'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { register, type RegisterActionState } from '../actions';
import { CheckCircle, Mail } from 'lucide-react';

export default function RegisterPage() {
  const [state, formAction] = useFormState<RegisterActionState, FormData>(
    register,
    {
      status: 'idle',
    },
  );

  if (state.status === 'email_sent') {
    return (
      <div className="flex h-dvh w-screen items-center justify-center bg-background">
        <div className="w-full max-w-md overflow-hidden rounded-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Cuenta creada exitosamente!
            </h1>
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-5 w-5 text-blue-600 mr-2" />
              <p className="text-gray-600 dark:text-gray-300">
                Email de verificación enviado
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              Te hemos enviado un correo electrónico con un enlace de verificación. 
              Revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                Pasos siguientes:
              </h3>
              <ol className="text-sm text-blue-700 dark:text-blue-400 text-left space-y-1">
                <li>1. Revisa tu bandeja de entrada</li>
                <li>2. Busca el email de Lex AI Chat</li>
                                 <li>3. Haz clic en &quot;Verificar mi cuenta&quot;</li>
                <li>4. Regresa aquí para iniciar sesión</li>
              </ol>
            </div>
            
            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Ir al inicio de sesión
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ¿No recibiste el email? Revisa tu carpeta de spam o 
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 ml-1"
                >
                  intenta registrarte nuevamente
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Crear Cuenta</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Únete a la plataforma legal inteligente
          </p>
        </div>
        <AuthForm action={formAction}>
          {state.status === 'user_exists' && (
            <div className="text-sm text-red-500">
              Ya existe una cuenta con este email. 
              <Link href="/login" className="underline ml-1">
                Inicia sesión aquí
              </Link>
            </div>
          )}
          {state.status === 'failed' && (
            <div className="text-sm text-red-500">
              Error al crear la cuenta. Por favor, inténtalo de nuevo.
            </div>
          )}
          {state.status === 'invalid_data' && (
            <div className="text-sm text-red-500">
              Datos de entrada inválidos. Verifica que el email sea válido y la contraseña tenga al menos 6 caracteres.
            </div>
          )}
          
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <p className="font-medium mb-1">Al crear tu cuenta:</p>
            <ul className="space-y-1">
              <li>• Recibirás un email de verificación</li>
              <li>• Debes verificar tu email antes de poder iniciar sesión</li>
              <li>• Tus datos están protegidos según normativas argentinas</li>
            </ul>
          </div>
          
          <SubmitButton isSuccessful={false}>Crear Cuenta</SubmitButton>
        </AuthForm>
        
        <div className="text-center text-sm text-gray-500 dark:text-zinc-400">
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/login"
            className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
