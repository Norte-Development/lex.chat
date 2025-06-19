import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  FileText,
  CheckCircle,
  ArrowRight,
  Shield,
  Users,
  AlertTriangle,
} from "lucide-react"

export default function TermsPage() {
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
            <Link href="/contact" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Contacto
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
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge variant="outline" className="mb-6">
            Términos de Servicio
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Última actualización: 15 de Diciembre, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          
          {/* Introduction */}
          <Card className="mb-8 border-primary/10">
            <CardContent className="pt-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Introducción</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Estos Términos de Servicio ("Términos") rigen el uso de la plataforma lex-ai.chat 
                    y todos los servicios relacionados proporcionados por nuestra empresa. Al acceder 
                    o utilizar nuestros servicios, usted acepta estar sujeto a estos Términos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="mb-8 border-primary/10">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">1. Descripción del Servicio</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  lex-ai.chat es una plataforma de inteligencia artificial especializada en derecho argentino 
                  que proporciona respuestas a consultas jurídicas basadas en nuestra base de datos de 
                  legislación nacional y provincial.
                </p>
                <p>Nuestros servicios incluyen:</p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Consultas de inteligencia artificial sobre derecho argentino</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Acceso a base de datos jurídica actualizada</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Referencias y citas a fuentes oficiales</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Herramientas de búsqueda y filtrado avanzado</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Obligations */}
          <Card className="mb-8 border-primary/10">
            <CardContent className="pt-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="w-full">
                  <h2 className="text-2xl font-bold mb-4">2. Obligaciones del Usuario</h2>
                  
                  <h3 className="text-lg font-semibold mb-3">Uso Permitido</h3>
                  <p className="text-muted-foreground mb-4">
                    Usted se compromete a utilizar nuestros servicios únicamente para fines legales y profesionales:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Consultas jurídicas legítimas relacionadas con su práctica profesional</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Investigación legal para casos reales</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Educación y capacitación en derecho argentino</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-3">Uso Prohibido</h3>
                  <p className="text-muted-foreground mb-4">
                    Está estrictamente prohibido:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Intentar acceder a sistemas no autorizados</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Realizar ingeniería inversa del software</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Usar el servicio para actividades ilegales</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Compartir credenciales de acceso</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mb-8 border-orange-200 bg-orange-50/50">
            <CardContent className="pt-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="w-full">
                  <h2 className="text-2xl font-bold mb-4 text-orange-800">3. Limitaciones y Exclusiones de Responsabilidad</h2>
                  
                  <div className="space-y-4 text-orange-700">
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">IMPORTANTE: Uso Profesional Requerido</h3>
                      <p className="text-sm">
                        lex-ai.chat es una herramienta de asistencia para profesionales del derecho. 
                        Nuestras respuestas NO constituyen asesoramiento legal directo y siempre deben 
                        ser verificadas por un abogado calificado antes de su aplicación.
                      </p>
                    </div>
                    
                    <h3 className="text-lg font-semibold">Limitaciones del Servicio</h3>
                    <ul className="space-y-2">
                      <li>• La información proporcionada está sujeta a interpretación profesional</li>
                      <li>• Los datos pueden contener errores o estar desactualizados</li>
                      <li>• No garantizamos la disponibilidad continua del servicio</li>
                      <li>• Los resultados pueden variar según la complejidad de la consulta</li>
                    </ul>
                    
                    <p className="text-sm">
                      En ningún caso seremos responsables por daños directos, indirectos, incidentales 
                      o consecuentes derivados del uso de nuestros servicios.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="mb-8 border-primary/10">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">4. Términos de Pago</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold">Suscripciones</h3>
                <ul className="space-y-2">
                  <li>• Las suscripciones se facturan por adelantado mensualmente</li>
                  <li>• Los precios están expresados en dólares estadounidenses (USD)</li>
                  <li>• La renovación es automática salvo cancelación previa</li>
                  <li>• Los reembolsos se procesan según nuestra política de reembolsos</li>
                </ul>
                
                <h3 className="text-lg font-semibold">Cancelación</h3>
                <p>
                  Puede cancelar su suscripción en cualquier momento. La cancelación será efectiva 
                  al final del período de facturación actual.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8 border-primary/10">
            <CardContent className="pt-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="w-full">
                  <h2 className="text-2xl font-bold mb-4">5. Propiedad Intelectual</h2>
                  
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Todos los derechos de propiedad intelectual en lex-ai.chat, incluyendo pero no 
                      limitado a software, algoritmos, bases de datos, y contenido, son propiedad 
                      exclusiva de nuestra empresa.
                    </p>
                    
                    <h3 className="text-lg font-semibold">Licencia de Uso</h3>
                    <p>
                      Le otorgamos una licencia limitada, no exclusiva, no transferible para utilizar 
                      nuestros servicios de acuerdo con estos Términos.
                    </p>
                    
                    <h3 className="text-lg font-semibold">Contenido del Usuario</h3>
                    <p>
                      Usted conserva la propiedad de sus consultas y datos. Nos otorga permiso para 
                      procesarlos únicamente para brindar nuestros servicios.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-8 border-primary/10">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">6. Terminación</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Podemos suspender o terminar su acceso a los servicios inmediatamente, sin previo 
                  aviso, por cualquier violación de estos Términos.
                </p>
                
                <h3 className="text-lg font-semibold">Efectos de la Terminación</h3>
                <ul className="space-y-2">
                  <li>• Cesará inmediatamente su derecho a usar los servicios</li>
                  <li>• Podremos eliminar su cuenta y datos asociados</li>
                  <li>• Las obligaciones de pago permanecen vigentes</li>
                  <li>• Las cláusulas de limitación de responsabilidad sobreviven</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="mb-8 border-primary/10">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">7. Ley Aplicable y Jurisdicción</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Estos Términos se rigen por las leyes de la República Argentina. Cualquier disputa 
                  se resolverá en los tribunales competentes de la Ciudad Autónoma de Buenos Aires.
                </p>
                
                <h3 className="text-lg font-semibold">Resolución de Disputas</h3>
                <p>
                  Antes de iniciar cualquier acción legal, las partes se comprometen a intentar 
                  resolver las disputas mediante negociación directa de buena fe.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="mb-8 border-primary/10">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">8. Contacto</h2>
              <p className="text-muted-foreground mb-4">
                Para consultas sobre estos Términos, puede contactarnos:
              </p>
              
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> legal@lex-ai.chat</p>
                <p><strong>Teléfono:</strong> +54 11 4567-8900</p>
                <p><strong>Dirección:</strong> Av. Corrientes 1234, Piso 10, CABA, Argentina</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">¿Acepta estos Términos?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Al usar lex-ai.chat, acepta automáticamente estos términos y condiciones
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600">
                Comenzar con lex-ai.chat
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/privacy">
              <Button size="lg" variant="outline">
                Ver Política de Privacidad
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}