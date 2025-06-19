'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Scale,
  ExternalLink,
  MessageSquare,
  Globe,
  FileText,
  BookOpen,
  Clock,
  Shield,
  Zap,
  Users,
  X,
  Loader2,
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe-constants';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasActiveSubscription?: boolean;
}

export function SubscriptionModal({ isOpen, onClose, hasActiveSubscription = false }: SubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error('No session ID returned');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Stripe checkout error:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setIsLoadingPortal(true);
      
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error('No portal URL returned');
      }

      // Open Stripe Customer Portal in new tab
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error accessing billing portal:', error);
    } finally {
      setIsLoadingPortal(false);
    }
  };

  if (!isOpen) return null;

  const plan = SUBSCRIPTION_PLANS.professional;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="border-2 border-primary shadow-2xl relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-600 to-emerald-600"></div>

          <CardHeader className="text-center pb-8 pt-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Scale className="w-8 h-8 text-white" />
            </div>
            
            <Badge className="mx-auto mb-4 bg-gradient-to-r from-primary to-blue-600">
              Suscripción Requerida
            </Badge>
            
            <CardTitle className="text-3xl mb-4">
              Acceso Premium a lex-ai.chat
            </CardTitle>
            
            <CardDescription className="text-lg">
              Para utilizar el chat especializado necesitas una suscripción activa.
              Obtén acceso completo a toda la base de datos jurídica argentina.
            </CardDescription>

            <div className="flex items-center justify-center space-x-2 mt-6">
              <span className="text-2xl text-muted-foreground line-through">$15</span>
              <Badge variant="destructive" className="text-xs">50% OFF</Badge>
              <div className="text-4xl font-bold text-primary">
                ${plan.price}<span className="text-lg text-muted-foreground">/{plan.interval}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4">
              {[
                { icon: MessageSquare, text: "Consultas ilimitadas" },
                { icon: Globe, text: "Todas las jurisdicciones" },
                { icon: FileText, text: "Fuentes oficiales actualizadas" },
                { icon: BookOpen, text: "Jurisprudencia completa" },
                { icon: Clock, text: "Historial ilimitado" },
                { icon: Shield, text: "Soporte prioritario 24/7" },
                { icon: Zap, text: "Respuestas instantáneas" },
                { icon: Users, text: "Actualizaciones en tiempo real" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-emerald-500/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">7 días gratis</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Comienza tu prueba gratuita hoy. Cancela en cualquier momento sin compromisos.
              </p>
            </div>

            <div className="space-y-4">
              {hasActiveSubscription ? (
                <Button
                  onClick={handleManageSubscription}
                  disabled={isLoadingPortal}
                  size="lg"
                  variant="outline"
                  className="w-full text-lg py-3"
                >
                  {isLoadingPortal ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 w-5 h-5" />
                      Gestionar Suscripción
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  size="lg"
                  className="w-full text-lg py-3 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 w-5 h-5" />
                      Comenzar Suscripción
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              )}

              <div className="text-center space-y-2">
                {hasActiveSubscription ? (
                  <p className="text-xs text-muted-foreground">
                    Serás redirigido al portal seguro de Stripe para gestionar tu suscripción,
                    actualizar métodos de pago y ver tu historial de facturación.
                  </p>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground">
                      ✓ Cancelación inmediata • ✓ Sin compromisos a largo plazo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ✓ Facturación mensual • ✓ Soporte incluido
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}