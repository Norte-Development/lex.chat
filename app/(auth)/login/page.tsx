'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { login, type LoginActionState } from '../actions';

function LoginForm() {
  const [state, formAction] = useFormState<LoginActionState, FormData>(login, {
    status: 'idle',
  });
  
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show success messages for email verification or password reset
    const verified = searchParams.get('verified');
    const reset = searchParams.get('reset');
    
    if (verified === 'true') {
      // Could show a toast notification here
    }
    
    if (reset === 'true') {
      // Could show a toast notification here
    }
  }, [searchParams]);

  if (state.status === 'success') {
    redirect('/');
  }

  return (
    <div className="flex h-dvh w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Iniciar Sesión</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Accede a tu cuenta de Lex AI Chat
          </p>
        </div>
        <AuthForm action={formAction}>
          {state.status === 'failed' && (
            <div className="text-sm text-red-500">
              Email o contraseña incorrectos. Por favor, inténtalo de nuevo.
            </div>
          )}
          {state.status === 'invalid_data' && (
            <div className="text-sm text-red-500">
              Datos de entrada inválidos. Por favor, verifica tu información.
            </div>
          )}
          {state.status === 'email_not_verified' && (
            <div className="text-sm text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
              <p className="font-medium mb-1">Email no verificado</p>
              <p className="text-xs">
                Debes verificar tu dirección de email antes de poder iniciar sesión. 
                Revisa tu bandeja de entrada y haz clic en el enlace de verificación.
              </p>
              <p className="text-xs mt-2">
                ¿No recibiste el email? Puedes solicitar uno nuevo en la página de registro.
              </p>
            </div>
          )}
          
          <SubmitButton isSuccessful={false}>Iniciar Sesión</SubmitButton>
          
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </AuthForm>
        
        <div className="text-center text-sm text-gray-500 dark:text-zinc-400">
          ¿No tienes una cuenta?{' '}
          <Link
            href="/register"
            className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-dvh w-screen items-center justify-center bg-background">Cargando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
