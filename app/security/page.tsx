import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Shield,
  Lock,
  Eye,
  Server,
  CheckCircle,
  ArrowRight,
  Key,
  AlertTriangle,
  FileText,
  Users,
  Clock,
} from "lucide-react"

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Encriptación AES-256",
      description: "Todos los datos se encriptan en tránsito y en reposo con el estándar más alto de la industria",
      color: "from-blue-500 to-primary"
    },
    {
      icon: Key,
      title: "Autenticación Multi-Factor",
      description: "Protección adicional con 2FA disponible para todas las cuentas",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: Server,
      title: "Infraestructura Segura",
      description: "Servidores en centros de datos certificados SOC 2 y ISO 27001",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Eye,
      title: "Monitoreo 24/7",
      description: "Vigilancia continua y detección automática de amenazas",
      color: "from-orange-500 to-red-600"
    }
  ]

  const certifications = [
    { name: "ISO 27001", description: "Gestión de Seguridad de la Información" },
    { name: "SOC 2 Tipo II", description: "Controles de Seguridad y Disponibilidad" },
    { name: "GDPR", description: "Reglamento General de Protección de Datos" },
    { name: "Ley 25.326", description: "Protección de Datos Personales Argentina" }
  ]

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
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        </div>

        <div className="container mx-auto text-center max-w-6xl relative z-10">
          <Badge variant="outline" className="mb-6">
            Seguridad de Nivel Empresarial
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            Tu Información Protegida al Máximo Nivel
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Implementamos los más altos estándares de seguridad para proteger tus datos 
            y consultas legales confidenciales.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Características de Seguridad</h2>
            <p className="text-xl text-muted-foreground">
              Protección multicapa para tus datos más sensibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20 group">
                <CardContent className="pt-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Protección de Datos</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Encriptación en Tránsito</h3>
                    <p className="text-muted-foreground text-sm">
                      Todas las comunicaciones utilizan TLS 1.3 para proteger los datos mientras se transmiten.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Encriptación en Reposo</h3>
                    <p className="text-muted-foreground text-sm">
                      Los datos almacenados están protegidos con encriptación AES-256 en nuestras bases de datos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Anonimización</h3>
                    <p className="text-muted-foreground text-sm">
                      Las consultas se procesan de forma anonimizada para proteger la confidencialidad attorney-client.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Retención Limitada</h3>
                    <p className="text-muted-foreground text-sm">
                      Los datos se conservan solo el tiempo necesario según nuestras políticas de retención.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Seguridad Certificada</h3>
                  <p className="text-muted-foreground mb-6">
                    Auditados y certificados por organismos internacionales de seguridad
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="text-center">
                        <div className="font-semibold text-sm">{cert.name}</div>
                        <div className="text-xs text-muted-foreground">{cert.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Access Controls */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Controles de Acceso</h2>
            <p className="text-xl text-muted-foreground">
              Múltiples capas de autenticación y autorización
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/10 hover:border-primary/20 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Autenticación Fuerte</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Contraseñas seguras obligatorias</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Autenticación de dos factores (2FA)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>SSO para empresas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Bloqueo automático de cuentas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10 hover:border-primary/20 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Control de Acceso</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Principio de menor privilegio</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Roles y permisos granulares</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Revisión periódica de accesos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Segregación de ambientes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10 hover:border-primary/20 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Monitoreo y Auditoría</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Logs de actividad completos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Alertas en tiempo real</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Análisis de comportamiento</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Retención de logs por 7 años</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Respuesta a Incidentes</h2>
            <p className="text-xl text-muted-foreground">
              Protocolos establecidos para la gestión de incidentes de seguridad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/10">
              <CardContent className="pt-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Plan de Respuesta</h3>
                    <p className="text-muted-foreground mb-4">
                      Tenemos un plan detallado para responder a incidentes de seguridad con tiempos de respuesta definidos.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Detección: &lt;15 minutos</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Evaluación: &lt;1 hora</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Contención: &lt;4 horas</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Notificación: &lt;24 horas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardContent className="pt-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Transparencia</h3>
                    <p className="text-muted-foreground mb-4">
                      Mantenemos comunicación transparente sobre cualquier incidente que pueda afectar a nuestros usuarios.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Notificación inmediata a usuarios afectados</li>
                      <li>• Reportes detallados post-incidente</li>
                      <li>• Medidas correctivas implementadas</li>
                      <li>• Mejoras en los procesos de seguridad</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary via-blue-600 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.1%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tu Seguridad es Nuestra Prioridad
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Confía en lex-ai.chat para proteger tu información más sensible con los 
            más altos estándares de seguridad de la industria.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Comenzar de Forma Segura
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Consultar Seguridad
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}