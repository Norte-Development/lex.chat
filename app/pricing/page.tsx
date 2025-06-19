'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from "next/link"
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Scale,
  MessageSquare,
  Globe,
  FileText,
  BookOpen,
  Clock,
  Shield,
  Users,
  Building,
  Phone,
  Mail,
  Zap,
  Star,
  X,
  Loader2,
  ExternalLink,
} from "lucide-react"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelMessage, setShowCancelMessage] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean | null>(null);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  useEffect(() => {
    const canceled = searchParams.get('canceled');
    if (canceled === 'true') {
      setShowCancelMessage(true);
      // Clear the message after 5 seconds
      setTimeout(() => setShowCancelMessage(false), 5000);
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
      } catch (error) {
        console.error('Error checking subscription:', error);
        setHasActiveSubscription(false);
      }
    };

    if (session?.user?.id) {
      checkSubscription();
    }
  }, [session?.user?.id]);

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

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

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
      // You could show a toast notification here
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Cancel Message */}
      {showCancelMessage && (
        <div className="bg-orange-100 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 text-orange-700 dark:text-orange-300">
          <div className="container mx-auto">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <X className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm">
                  El proceso de suscripción fue cancelado. No se realizó ningún cargo a tu tarjeta.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl">lex-ai.chat</div>
              <div className="text-xs text-muted-foreground">IA Jurídica Argentina</div>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/features" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Características
            </Link>
            <Link href="/demo" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Ver Demo
            </Link>
            <Link href="/login">
              <Button variant="outline" className="hover:bg-primary/5 border-primary/20 transition-all duration-300">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        </div>

        <div className="container mx-auto text-center max-w-6xl relative z-10">
          <Badge variant="outline" className="mb-6">
            Precios Transparentes
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            Un Plan Simple, Potencia Ilimitada
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Sin límites ocultos, sin tarifas por uso. Un precio fijo para acceso completo 
            a toda la base de datos jurídica argentina.
          </p>
          
          {/* Current Offer */}
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 via-blue-500/10 to-emerald-500/10 border border-primary/20 rounded-full px-8 py-4 mb-8">
            <Badge variant="destructive" className="bg-red-100 text-red-800">
              Oferta Limitada
            </Badge>
            <div className="text-sm text-muted-foreground font-medium">50% de descuento</div>
            <div className="text-2xl font-black text-primary">$8 USD</div>
            <div className="text-sm text-muted-foreground line-through">$15</div>
            <div className="text-sm text-muted-foreground">/mes</div>
          </div>
        </div>
      </section>

      {/* Main Pricing */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Free Trial */}
            <Card className="text-center border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-8 pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/60 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl mb-2">Prueba Gratuita</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-4">
                  $0<span className="text-lg text-muted-foreground">/7 días</span>
                </div>
                <CardDescription>Prueba completa por una semana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  {[
                    { text: "Acceso completo por 7 días", included: true },
                    { text: "Todas las jurisdicciones", included: true },
                    { text: "Soporte por email", included: true },
                    { text: "Sin tarjeta de crédito", included: true },
                    { text: "Historial limitado", included: false },
                    { text: "Soporte prioritario", included: false },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.included ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Link href="/register">
                  <Button variant="outline" className="w-full">
                    Comenzar Prueba
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="text-center border-2 border-primary shadow-2xl relative overflow-hidden scale-105">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-600 to-emerald-600"></div>
              <CardHeader className="pb-8 pt-8">
                <Badge className="mx-auto mb-4 bg-gradient-to-r from-primary to-blue-600">Más Popular</Badge>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl mb-2">Plan Profesional</CardTitle>
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl text-muted-foreground line-through">$15</span>
                    <Badge variant="destructive" className="text-xs">50% OFF</Badge>
                  </div>
                  <div className="text-5xl font-bold text-primary">
                    $8<span className="text-xl text-muted-foreground">/mes</span>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Acceso completo para profesionales
                </CardDescription>
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

                <Separator />

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
                          Comenzar Ahora
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  )}
                  <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground">
                      ✓ 7 días gratis • ✓ Cancela cuando quieras
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ✓ Sin compromisos • ✓ Facturación mensual
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="text-center border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-8 pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">Plan Empresarial</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-4">
                  Personalizado
                </div>
                <CardDescription>Para estudios y empresas grandes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  {[
                    { text: "Todo del plan profesional", included: true },
                    { text: "Múltiples usuarios", included: true },
                    { text: "API personalizada", included: true },
                    { text: "Integración con sistemas", included: true },
                    { text: "Soporte dedicado", included: true },
                    { text: "Facturación anual", included: true },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contactar Ventas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comparación Detallada</h2>
            <p className="text-xl text-muted-foreground">Todas las características en detalle</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-lg border border-border">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-6 font-semibold">Características</th>
                  <th className="text-center p-6 font-semibold">Prueba</th>
                  <th className="text-center p-6 font-semibold bg-primary/5">Profesional</th>
                  <th className="text-center p-6 font-semibold">Empresarial</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Consultas por mes", trial: "Ilimitadas", pro: "Ilimitadas", enterprise: "Ilimitadas" },
                  { feature: "Jurisdicciones", trial: "Todas", pro: "Todas", enterprise: "Todas" },
                  { feature: "Historial", trial: "7 días", pro: "Ilimitado", enterprise: "Ilimitado" },
                  { feature: "Soporte", trial: "Email", pro: "24/7 Prioritario", enterprise: "Dedicado" },
                  { feature: "API", trial: "No", pro: "No", enterprise: "Sí" },
                  { feature: "Usuarios", trial: "1", pro: "1", enterprise: "Ilimitados" },
                  { feature: "Integración", trial: "No", pro: "No", enterprise: "Sí" },
                  { feature: "SLA", trial: "No", pro: "99.9%", enterprise: "99.99%" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-b-0">
                    <td className="p-6 font-medium">{row.feature}</td>
                    <td className="p-6 text-center text-muted-foreground">{row.trial}</td>
                    <td className="p-6 text-center bg-primary/5 font-semibold text-primary">{row.pro}</td>
                    <td className="p-6 text-center text-muted-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Preguntas sobre Precios</h2>
            <p className="text-xl text-muted-foreground">Todo lo que necesitas saber sobre nuestros planes</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "¿Puedo cambiar de plan en cualquier momento?",
                answer: "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo de facturación."
              },
              {
                question: "¿Ofrecen descuentos por pago anual?",
                answer: "Sí, el pago anual incluye 2 meses gratis (16% de descuento). Contacta a nuestro equipo de ventas para más detalles."
              },
              {
                question: "¿Qué métodos de pago aceptan?",
                answer: "Aceptamos todas las tarjetas de crédito principales (Visa, MasterCard, American Express) y transferencias bancarias para planes empresariales."
              },
              {
                question: "¿Hay costos ocultos o tarifas adicionales?",
                answer: "No, nuestros precios son completamente transparentes. No hay tarifas por uso, límites ocultos o costos adicionales."
              },
              {
                question: "¿Puedo cancelar mi suscripción?",
                answer: "Sí, puedes cancelar en cualquier momento sin penalizaciones. Tu acceso continuará hasta el final del período pagado."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary via-blue-600 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.1%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comienza tu Prueba Gratuita Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experimenta el poder de lex-ai.chat gratis por 7 días. 
            Sin compromiso, sin tarjeta de crédito requerida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {hasActiveSubscription ? (
              <Button
                onClick={handleManageSubscription}
                disabled={isLoadingPortal}
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300"
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
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 w-5 h-5" />
                    Comenzar Prueba Gratuita
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            )}
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Phone className="mr-2 w-4 h-4" />
                Hablar con Ventas
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Setup en 2 minutos</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Soporte incluido</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Cancela cuando quieras</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}