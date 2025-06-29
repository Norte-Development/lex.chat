'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SubscriptionModal } from '@/components/subscription-modal';
import { CheckCircle } from 'lucide-react';
import type { Session } from 'next-auth';

interface SubscriptionWrapperProps {
  session: Session;
  children: React.ReactNode;
}

export function SubscriptionWrapper({ session, children }: SubscriptionWrapperProps) {
  const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const searchParams = useSearchParams();

  // Check for success parameter
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true') {
      setShowSuccessMessage(true);
      // Clear the message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
      
      // Clear the URL parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('success');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch('/api/subscription/status');
        const data = await response.json();
        
        setHasActiveSubscription(data.hasActiveSubscription);
        
        if (!data.hasActiveSubscription) {
          setShowSubscriptionModal(true);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setHasActiveSubscription(false);
        setShowSubscriptionModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      checkSubscription();
    }
  }, [session?.user?.id]);

  // Show loading while checking subscription
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render chat if no active subscription
  if (!hasActiveSubscription) {
    return (
      <>
        <div className="flex items-center justify-center h-screen bg-muted/20">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Suscripción Requerida</h2>
            <p className="text-muted-foreground mb-6">
              Para acceder al chat necesitas una suscripción activa. 
              Comienza tu prueba gratuita de 7 días.
            </p>
          </div>
        </div>
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
        />
      </>
    );
  }

  return (
    <>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 dark:bg-green-900/20 border-l-4 border-green-500 p-4 text-green-700 dark:text-green-300 rounded-md shadow-lg max-w-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                ¡Suscripción activada exitosamente!
              </p>
              <p className="text-xs mt-1">
                Ahora tienes acceso completo a todas las funcionalidades.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {children}
    </>
  );
} 