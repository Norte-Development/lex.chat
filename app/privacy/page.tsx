import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default function PrivacyPage() {
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
            Política de Privacidad
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            Tu Privacidad es Nuestra Prioridad
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Última actualización: 15 de Diciembre, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <Card className="mb-8 border-primary/10">
              <CardContent className="pt-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Introducción</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      En lex-ai.chat valoramos y respetamos tu privacidad. Esta Política de Privacidad describe 
                      cómo recopilamos, usamos, procesamos y protegemos tu información personal cuando utilizas 
                      nuestros servicios de inteligencia artificial especializada en derecho argentino.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="mb-8 border-primary/10">
              <CardContent className="pt-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Información que Recopilamos</h2>
                    
                    <h3 className="text-lg font-semibold mb-3">1. Información de Cuenta</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                      <li>Nombre y apellido</li>
                      <li>Dirección de correo electrónico</li>
                      <li>Información profesional (estudio jurídico, área de práctica)</li>
                      <li>Preferencias de cuenta y configuración</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-3">2. Información de Uso</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                      <li>Consultas realizadas a nuestra IA (anonimizadas)</li>
                      <li>Frecuencia y patrones de uso</li>
                      <li>Preferencias de búsqueda y filtros utilizados</li>
                      <li>Historial de navegación en la plataforma</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-3">3. Información Técnica</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Dirección IP y ubicación geográfica aproximada</li>
                      <li>Tipo de dispositivo y navegador</li>
                      <li>Cookies y tecnologías similares</li>
                      <li>Logs de sistema y errores</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="mb-8 border-primary/10">
              <CardContent className="pt-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Cómo Utilizamos tu Información</h2>
                    
                    <div className="space-y-4 text-muted-foreground">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p><strong>Proveer nuestros servicios:</strong> Procesar tus consultas legales y generar respuestas precisas</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p><strong>Mejorar nuestro servicio:</strong> Analizar patrones de uso para optimizar nuestros algoritmos</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p><strong>Comunicación:</strong> Enviarte actualizaciones, soporte técnico y información relevante</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p><strong>Seguridad:</strong> Detectar y prevenir actividades fraudulentas o abuso de la plataforma</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulatorias aplicables</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="mb-8 border-primary/10">
              <CardContent className="pt-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Protección de Datos</h2>
                    
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Implementamos medidas de seguridad técnicas y organizativas avanzadas para proteger 
                        tu información personal:
                      </p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Encriptación:</strong> Todos los datos se transmiten y almacenan con encriptación AES-256</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Acceso limitado:</strong> Solo personal autorizado puede acceder a datos personales</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Auditorías regulares:</strong> Realizamos auditorías de seguridad trimestrales</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Servidores seguros:</strong> Infraestructura hospedada en centros de datos certificados</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8 border-primary/10">
              <CardContent className="pt-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Tus Derechos</h2>
                    
                    <p className="text-muted-foreground mb-4">
                      De acuerdo con las leyes de protección de datos argentinas e internacionales, tienes los siguientes derechos:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Acceso:</strong>
                            <p className="text-sm text-muted-foreground">Solicitar una copia de tus datos personales</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Rectificación:</strong>
                            <p className="text-sm text-muted-foreground">Corregir datos inexactos o incompletos</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Eliminación:</strong>
                            <p className="text-sm text-muted-foreground">Solicitar la eliminación de tus datos</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Portabilidad:</strong>
                            <p className="text-sm text-muted-foreground">Recibir tus datos en formato estructurado</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Oposición:</strong>
                            <p className="text-sm text-muted-foreground">Oponerte al procesamiento de tus datos</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Limitación:</strong>
                            <p className="text-sm text-muted-foreground">Restringir el procesamiento de tus datos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8 border-primary/10">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Contacto</h2>
                <p className="text-muted-foreground mb-4">
                  Para ejercer tus derechos o realizar consultas sobre esta política de privacidad, puedes contactarnos:
                </p>
                
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> privacidad@lex-ai.chat</p>
                  <p><strong>Teléfono:</strong> +54 11 4567-8900</p>
                  <p><strong>Dirección:</strong> Av. Corrientes 1234, Piso 10, CABA, Argentina</p>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Responderemos a tu solicitud dentro de 30 días calendario.
                </p>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card className="mb-8 border-primary/10">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Actualizaciones de esta Política</h2>
                <p className="text-muted-foreground">
                  Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre 
                  cambios significativos por email o mediante un aviso prominente en nuestra plataforma. 
                  Te recomendamos revisar esta política periódicamente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">¿Tienes Preguntas sobre Privacidad?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Nuestro equipo de privacidad está disponible para resolver todas tus dudas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600">
                Contactar Equipo de Privacidad
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}