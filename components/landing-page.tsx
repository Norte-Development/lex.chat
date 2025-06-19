import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Sparkles,
  Globe,
  Lock,
  FileText,
  Users,
  Clock,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Play,
  Award,
  TrendingUp,
  BookOpen,
  Scale,
  MessageSquare,
  ChevronDown,
} from "lucide-react"

export default function EnhancedLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl">lex-ai.chat</div>
              <div className="text-xs text-muted-foreground">IA Jurídica Argentina</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/demo" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Ver Demo
            </Link>
            <Link href="/pricing" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Precios
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
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        </div>

        <div className="container mx-auto text-center max-w-7xl relative z-10">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 via-blue-500/10 to-emerald-500/10 border border-primary/20 rounded-full px-6 py-3 mb-8 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gradient-to-br from-primary to-blue-600 rounded-full border-2 border-white flex items-center justify-center"
                >
                  <Users className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>
            <span className="text-sm font-semibold text-primary">+500 abogados confían en nosotros</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          {/* Main Heading */}
          <div className="relative mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
              <div className="relative inline-block">
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                  El ChatGPT para
                </span>
              </div>
              <br />
              <div className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Derecho Argentino
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-600 to-emerald-600 rounded-full animate-pulse"></div>
              </div>
            </h1>
          </div>

          {/* Enhanced Value Proposition */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed font-light">
              La primera IA especializada en derecho argentino que consulta
              <span className="font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}
                con base de datos actualizada diariamente
              </span>
              .
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium">Respuestas en segundos</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-primary rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium">Actualizado diariamente</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium">Disponible 24/7</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/register">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-primary via-blue-600 to-primary hover:from-primary/90 hover:via-blue-600/90 hover:to-primary/90 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Sparkles className="mr-2 w-5 h-5" />
                <span className="font-bold">Comenzar Gratis</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-primary/40 hover:bg-primary/10 hover:border-primary/60 transition-all duration-500 group backdrop-blur-sm hover:shadow-xl"
              >
                <Play className="mr-2 w-4 h-4" />
                <span className="group-hover:text-primary transition-colors font-semibold">Ver Demo</span>
              </Button>
            </Link>
          </div>

          {/* Pricing Badge */}
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 backdrop-blur-md border border-border/50 rounded-full px-8 py-4 hover:scale-105 transition-transform duration-300 shadow-lg">
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
              Oferta de lanzamiento
            </Badge>
            <div className="text-sm text-muted-foreground font-medium">Solo</div>
            <div className="text-2xl font-black text-primary">$8 USD</div>
            <div className="text-sm text-muted-foreground">/mes</div>
            <div className="text-xs text-muted-foreground line-through">$15</div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Abogados activos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">Consultas resueltas</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Tiempo de actividad</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Calificación promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Características Principales
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                &ldquo;¿Por qué elegir lex-ai.chat?&rdquo;
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La herramienta más avanzada para consultas jurídicas en Argentina, diseñada específicamente para
              profesionales del derecho
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/30 bg-gradient-to-br from-card via-card to-muted/20 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 via-primary/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-primary rounded-xl flex items-center justify-center shadow-lg text-white">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  Base de Datos Actualizada
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  Base de datos propia actualizada diariamente con información de Infoleg, SAIJ y digestos provinciales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Actualización diaria automática",
                    "Verificación automática de vigencia",
                    "Citas precisas con enlaces directos",
                    "Historial de modificaciones normativas",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 group-hover:text-foreground transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/30 bg-gradient-to-br from-card via-card to-muted/20 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 via-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-primary rounded-xl flex items-center justify-center shadow-lg text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  IA Especializada en Derecho
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  Entrenada exclusivamente con legislación argentina y jurisprudencia local
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Comprende contexto jurídico argentino",
                    "Análisis de precedentes relevantes",
                    "Interpretación de normativas complejas",
                    "Sugerencias de estrategias legales",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 group-hover:text-foreground transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/30 bg-gradient-to-br from-card via-card to-muted/20 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 via-primary/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-primary rounded-xl flex items-center justify-center shadow-lg text-white">
                    <Lock className="w-6 h-6" />
                  </div>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  Seguridad Profesional
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  Máxima confidencialidad y seguridad para tu práctica legal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Encriptación end-to-end",
                    "Cumplimiento GDPR y normativas locales",
                    "Sin almacenamiento de consultas sensibles",
                    "Auditorías de seguridad regulares",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 group-hover:text-foreground transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Benefits */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Aumenta tu Productividad</h3>
                  <p className="text-muted-foreground mb-4">
                    Reduce el tiempo de investigación jurídica de horas a minutos. Obtén respuestas precisas
                    instantáneamente.
                  </p>
                  <div className="text-sm text-primary font-medium">Ahorra hasta 5 horas por día en investigación</div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-emerald-500/5 to-green-500/5 border-emerald-500/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Calidad Profesional</h3>
                  <p className="text-muted-foreground mb-4">
                    Respuestas con el rigor y precisión que exige tu práctica profesional, respaldadas por fuentes
                    oficiales.
                  </p>
                  <div className="text-sm text-emerald-600 font-medium">Validado por +500 abogados argentinos</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonios
            </Badge>
            <h2 className="text-4xl font-bold mb-6">Lo que dicen nuestros usuarios</h2>
            <p className="text-xl text-muted-foreground">
              Abogados de toda Argentina confían en lex-ai.chat para sus consultas diarias
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dra. María González",
                role: "Abogada Civilista - Buenos Aires",
                content:
                  "Increíble la precisión de las respuestas. Me ha ahorrado horas de investigación y las citas son siempre exactas.",
                rating: 5,
              },
              {
                name: "Dr. Carlos Martínez",
                role: "Especialista en Derecho Laboral - Córdoba",
                content:
                  "La mejor herramienta que he usado. Especialmente útil para consultas sobre legislación provincial actualizada.",
                rating: 5,
              },
              {
                name: "Dra. Ana Rodríguez",
                role: "Derecho Comercial - Rosario",
                content:
                  "Revolucionó mi práctica. Ahora puedo dar respuestas inmediatas a mis clientes con total confianza.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jurisdictions Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Cobertura Nacional
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Todas las Jurisdicciones Argentinas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Acceso completo a la legislación nacional y provincial, con actualizaciones automáticas
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: "Ciudad Autónoma de Buenos Aires", code: "CABA", color: "from-blue-500 to-cyan-500" },
              { name: "Provincia de Buenos Aires", code: "Buenos Aires", color: "from-green-500 to-emerald-500" },
              { name: "Provincia de Córdoba", code: "Córdoba", color: "from-purple-500 to-pink-500" },
              { name: "Provincia del Chaco", code: "Chaco", color: "from-teal-500 to-green-500" },
              { name: "Provincia de Misiones", code: "Misiones", color: "from-indigo-500 to-purple-500" },
              { name: "Provincia de Formosa", code: "Formosa", color: "from-pink-500 to-rose-500" },
              { name: "Provincia de Corrientes", code: "Corrientes", color: "from-cyan-500 to-blue-500" },
            ].map((jurisdiction) => (
              <Card
                key={jurisdiction.code}
                className="group text-center hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/20 hover:-translate-y-1 bg-gradient-to-br from-card to-muted/20"
              >
                <CardContent className="pt-6 pb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${jurisdiction.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                    {jurisdiction.code}
                  </h3>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    {jurisdiction.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              + Más jurisdicciones agregándose mensualmente
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/5 via-blue-500/5 to-emerald-500/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Precios
            </Badge>
            <h2 className="text-4xl font-bold mb-6">Precio Simple y Transparente</h2>
            <p className="text-xl text-muted-foreground">
              Un solo plan con acceso completo. Sin límites, sin sorpresas.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="text-center border-2 border-primary shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-600 to-emerald-600"></div>
              <CardHeader className="pb-8 pt-8">
                <Badge className="mx-auto mb-4 bg-gradient-to-r from-primary to-blue-600">Más Popular</Badge>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl mb-2">Plan Profesional</CardTitle>
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl text-muted-foreground line-through">$15</span>
                    <Badge variant="destructive" className="text-xs">
                      50% OFF
                    </Badge>
                  </div>
                  <div className="text-5xl font-bold text-primary">
                    $8<span className="text-xl text-muted-foreground">/mes</span>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Acceso completo a todas las funciones y fuentes jurídicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {[
                    { icon: MessageSquare, text: "Consultas ilimitadas" },
                    { icon: Globe, text: "Todas las jurisdicciones" },
                    { icon: FileText, text: "Fuentes oficiales: Infoleg, SAIJ, Digestos" },
                    { icon: BookOpen, text: "Jurisprudencia actualizada" },
                    { icon: Clock, text: "Historial completo de consultas" },
                    { icon: Shield, text: "Soporte prioritario 24/7" },
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
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="w-full text-lg py-3 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Sparkles className="mr-2 w-5 h-5" />
                      Comenzar Ahora
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground">
                      ✓ Prueba gratis por 7 días • ✓ Cancela cuando quieras
                    </p>
                    <p className="text-xs text-muted-foreground">✓ Sin compromisos • ✓ Soporte incluido</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">¿Necesitas un plan empresarial?</p>
            <Link href="/contact">
              <Button variant="outline" className="hover:bg-primary/5">
                Contactar Ventas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Preguntas Frecuentes
            </Badge>
            <h2 className="text-4xl font-bold mb-6">¿Tienes dudas?</h2>
            <p className="text-xl text-muted-foreground">Aquí están las respuestas a las preguntas más comunes</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "¿Cómo garantizan la precisión de las respuestas?",
                answer:
                  "Actualizamos nuestra base de datos diariamente con información de las fuentes oficiales (Infoleg, SAIJ, digestos provinciales). Esto nos permite ofrecer información precisa y actualizada",
              },
              {
                question: "¿Qué jurisdicciones están disponibles?",
                answer:
                  "Actualmente cubrimos CABA, Buenos Aires, Córdoba, Santa Fe, Chaco, Misiones, Formosa y Corrientes. Agregamos nuevas jurisdicciones mensualmente basándonos en la demanda de nuestros usuarios.",
              },
              {
                question: "¿Es seguro para información confidencial?",
                answer:
                  "Absolutamente. Utilizamos encriptación end-to-end, no almacenamos consultas sensibles y cumplimos con todas las normativas de protección de datos. Tu información está completamente protegida.",
              },
              {
                question: "¿Puedo cancelar mi suscripción en cualquier momento?",
                answer:
                  "Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario. No hay compromisos a largo plazo ni penalizaciones por cancelación.",
              },
              {
                question: "¿Ofrecen soporte técnico?",
                answer:
                  "Sí, todos nuestros usuarios tienen acceso a soporte prioritario 24/7 a través de chat, email y teléfono. Nuestro equipo está especializado en derecho y tecnología.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <ChevronDown className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary via-blue-600 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.1%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="mb-8">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">Oferta por tiempo limitado</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Transforma tu práctica jurídica hoy</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a más de 500 abogados que ya optimizaron su trabajo con lex-ai.chat. Comienza tu prueba gratuita de
              7 días.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Comenzar Prueba Gratuita
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Play className="mr-2 w-4 h-4" />
                Ver Demo en Vivo
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>7 días gratis</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Tarjeta de crédito requerida</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Cancela cuando quieras</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">lex-ai.chat</div>
                  <div className="text-xs text-muted-foreground">IA Jurídica Argentina</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                La primera inteligencia artificial especializada en derecho argentino.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <div className="space-y-2 text-sm">
                <Link href="/features" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Características
                </Link>
                <Link href="/pricing" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Precios
                </Link>
                <Link href="/demo" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Demo
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Acerca de
                </Link>
                <Link href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
                <Link href="/careers" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Carreras
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacidad
                </Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Términos
                </Link>
                <Link href="/security" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Seguridad
                </Link>
                <Link
                  href="/compliance"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cumplimiento
                </Link>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">© 2024 lex-ai.chat. Todos los derechos reservados.</div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Hecho con ❤️ en Argentina</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistema operativo</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
