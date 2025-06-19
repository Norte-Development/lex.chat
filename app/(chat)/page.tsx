'use client';

import { useEffect, useState } from 'react';
import { Chat } from '@/components/chat';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { SubscriptionModal } from '@/components/subscription-modal';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { guestRegex } from '@/lib/constants';

export default function Page() {
  const { data: session, status } = useSession();
  const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication first
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      redirect('/landing');
      return;
    }

    // Check if user is a guest and redirect to landing
    const isGuest = guestRegex.test(session.user?.email ?? '');
    if (isGuest) {
      redirect('/landing');
      return;
    }
  }, [session, status]);

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
  if (isLoading || status === 'loading') {
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

  // Ensure session is not null before rendering chat
  if (!session) {
    return null;
  }

  const id = generateUUID();

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
