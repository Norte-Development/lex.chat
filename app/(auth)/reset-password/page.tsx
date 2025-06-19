'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setStatus('error');
      setMessage('Token de restablecimiento no encontrado');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setMessage('Token no válido');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('¡Tu contraseña ha sido restablecida exitosamente!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login?reset=true');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error de conexión. Por favor, intenta nuevamente.');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Contraseña restablecida!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {message}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Serás redirigido al inicio de sesión en unos segundos...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Restablecer Contraseña
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ingresa tu nueva contraseña para tu cuenta de Lex AI Chat
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                  placeholder="Confirma tu nueva contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded-md ${
                status === 'error' 
                  ? 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                  : 'bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !token}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-[1.02]"
            >
              {status === 'loading' ? 'Restableciendo...' : 'Restablecer Contraseña'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}