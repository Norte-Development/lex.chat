import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Scale,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Users,
  Building,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
            <Link href="/pricing" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Precios
            </Link>
            <Link href="/demo" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Demo
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
            Contáctanos
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            Estamos Aquí para Ayudarte
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            ¿Tienes preguntas sobre lex-ai.chat? Nuestro equipo de expertos está 
            disponible para resolver todas tus dudas y ayudarte a comenzar.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: MessageSquare,
                title: "Chat en Vivo",
                description: "Habla directamente con nuestro equipo",
                details: "Disponible 24/7",
                action: "Iniciar Chat",
                color: "from-blue-500 to-primary"
              },
              {
                icon: Mail,
                title: "Email",
                description: "Envíanos un mensaje detallado",
                details: "hola@lex-ai.chat",
                action: "Enviar Email",
                color: "from-emerald-500 to-green-600"
              },
              {
                icon: Phone,
                title: "Teléfono",
                description: "Consulta telefónica personalizada",
                details: "+54 11 4567-8900",
                action: "Llamar Ahora",
                color: "from-purple-500 to-pink-600"
              }
            ].map((contact, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20 group">
                <CardContent className="pt-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                  <p className="text-muted-foreground mb-3">{contact.description}</p>
                  <p className="font-semibold text-primary mb-4">{contact.details}</p>
                  <Button variant="outline" className="w-full group-hover:bg-primary/5">
                    {contact.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y te responderemos en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" placeholder="Tu apellido" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Estudio/Empresa (opcional)</Label>
                  <Input id="company" placeholder="Nombre de tu estudio jurídico" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Motivo de consulta</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demo">Solicitar demo</SelectItem>
                      <SelectItem value="pricing">Consulta sobre precios</SelectItem>
                      <SelectItem value="enterprise">Plan empresarial</SelectItem>
                      <SelectItem value="technical">Soporte técnico</SelectItem>
                      <SelectItem value="partnership">Asociaciones</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  <Send className="mr-2 w-4 h-4" />
                  Enviar Mensaje
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Al enviar este formulario, aceptas nuestras políticas de privacidad
                </p>
              </CardContent>
            </Card>

            {/* Company Info */}
            <div className="space-y-8">
              <Card className="border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Oficinas Principales</h3>
                      <p className="text-muted-foreground">
                        Av. Corrientes 1234, Piso 10<br />
                        C1043AAZ, CABA, Argentina
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Horarios de Atención</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Lunes a Viernes: 9:00 - 18:00</p>
                        <p>Sábados: 10:00 - 14:00</p>
                        <p>Domingos: Cerrado</p>
                        <p className="text-primary font-medium">Chat 24/7 disponible</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Nuestro Equipo</h3>
                      <p className="text-muted-foreground">
                        Expertos en derecho argentino y tecnología legal, 
                        dedicados a brindarte el mejor soporte personalizado.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Preguntas Frecuentes</h2>
            <p className="text-xl text-muted-foreground">
              Respuestas rápidas a las consultas más comunes
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "¿Cuánto tiempo tarda en responder el soporte?",
                answer: "Nuestro tiempo de respuesta promedio es de 2 horas para consultas generales y 30 minutos para usuarios del plan profesional. El chat en vivo está disponible 24/7."
              },
              {
                question: "¿Ofrecen demos personalizadas?",
                answer: "Sí, ofrecemos demos personalizadas de 30 minutos donde mostramos cómo lex-ai.chat puede adaptarse específicamente a tu área de práctica legal."
              },
              {
                question: "¿Tienen planes especiales para estudios jurídicos grandes?",
                answer: "Absolutamente. Ofrecemos planes empresariales con descuentos por volumen, integración personalizada y soporte dedicado para estudios con más de 10 abogados."
              },
              {
                question: "¿Puedo hablar con alguien antes de suscribirme?",
                answer: "Por supuesto. Puedes agendar una llamada gratuita de consulta con nuestro equipo comercial para resolver todas tus dudas antes de tomar una decisión."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-primary/10 hover:border-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary via-blue-600 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.1%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Prefieres Probar Directamente?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comienza tu prueba gratuita de 7 días ahora mismo. 
            No necesitas hablar con nadie, sin tarjeta de crédito requerida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Comenzar Prueba Gratuita
                <ArrowRight className="ml-2 w-4 h-4" />
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
              <span>Acceso completo</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Sin compromisos</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}