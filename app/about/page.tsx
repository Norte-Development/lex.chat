import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Globe,
  Award,
  Heart,
  Brain,
  Shield,
  Zap,
  BookOpen,
  TrendingUp,
  CheckCircle,
} from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Carlos Mendoza",
      role: "CEO & Co-fundador",
      description: "Abogado con 15 años de experiencia en derecho corporativo. Ex-socio de estudio jurídico líder en CABA.",
      image: "CM"
    },
    {
      name: "Dra. María Rodriguez",
      role: "CTO & Co-fundadora",
      description: "Doctora en Ciencias de la Computación especializada en IA. Ex-ingeniera senior en Google.",
      image: "MR"
    },
    {
      name: "Dr. Alejandro López",
      role: "Director Legal",
      description: "Especialista en derecho argentino con foco en derecho constitucional y administrativo.",
      image: "AL"
    },
    {
      name: "Ana García",
      role: "Directora de Producto",
      description: "10 años de experiencia en productos tech. Ex-product manager en Microsoft y Mercado Libre.",
      image: "AG"
    }
  ]

  const values = [
    {
      icon: Target,
      title: "Precisión",
      description: "Cada respuesta debe ser exacta y estar respaldada por fuentes oficiales confiables.",
      color: "from-blue-500 to-primary"
    },
    {
      icon: Shield,
      title: "Confiabilidad",
      description: "Construimos tecnología en la que los profesionales pueden confiar para decisiones críticas.",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: Heart,
      title: "Accesibilidad",
      description: "Democratizamos el acceso a información jurídica de calidad para todos los profesionales.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Brain,
      title: "Innovación",
      description: "Pioneros en la aplicación de IA especializada al derecho argentino.",
      color: "from-orange-500 to-red-600"
    }
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
            Nuestra Historia
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            Transformando el Derecho Argentino con IA
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Nacimos de la frustración de dos abogados que perdían horas buscando información jurídica. 
            Hoy somos la herramienta de IA legal más avanzada de Argentina.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestra Historia</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  En 2023, el Dr. Carlos Mendoza y la Dra. María Rodriguez se conocieron en una conferencia sobre 
                  tecnología legal. Carlos, frustrado por las horas perdidas buscando jurisprudencia actualizada, 
                  se encontró con María, una experta en inteligencia artificial que había trabajado en Google.
                </p>
                <p>
                  Juntos identificaron un problema crítico: los abogados argentinos no tenían acceso a una herramienta 
                  que les permitiera consultar toda la legislación nacional y provincial de manera rápida y precisa. 
                  Las búsquedas manuales en múltiples fuentes consumían tiempo valioso que podría dedicarse a los clientes.
                </p>
                <p>
                  Decidieron crear lex-ai.chat: la primera IA especializada en derecho argentino que consulta 
                  diariamente las fuentes oficiales y proporciona respuestas precisas con citas exactas. 
                  Hoy, más de 500 abogados confían en nuestra plataforma para optimizar su práctica diaria.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl border border-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Scale className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">2023</h3>
                  <p className="text-muted-foreground">Año de fundación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Misión y Visión</h2>
            <p className="text-xl text-muted-foreground">
              Los principios que guían nuestro trabajo diario
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/10 hover:border-primary/20 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Nuestra Misión</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Democratizar el acceso a información jurídica de calidad en Argentina mediante 
                  inteligencia artificial especializada, permitiendo que todos los profesionales del 
                  derecho tengan acceso instantáneo a la legislación más actualizada.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 hover:border-primary/20 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Nuestra Visión</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Ser la plataforma de referencia para consultas jurídicas en América Latina, 
                  transformando la manera en que los abogados acceden y utilizan la información 
                  legal para brindar mejores servicios a sus clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestros Valores</h2>
            <p className="text-xl text-muted-foreground">
              Los principios que definen cómo trabajamos y nos relacionamos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20 group">
                <CardContent className="pt-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestro Equipo</h2>
            <p className="text-xl text-muted-foreground">
              Los expertos que hacen posible lex-ai.chat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20">
                <CardContent className="pt-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-white font-bold text-lg">
                    {member.image}
                  </div>
                  <h3 className="font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestros Logros</h2>
            <p className="text-xl text-muted-foreground">
              Los hitos que nos enorgullecen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                number: "500+",
                title: "Abogados Activos",
                description: "Profesionales que confían en nuestra plataforma diariamente"
              },
              {
                icon: BookOpen,
                number: "10,000+",
                title: "Consultas Resueltas",
                description: "Preguntas jurídicas respondidas con precisión"
              },
              {
                icon: Globe,
                number: "8",
                title: "Jurisdicciones",
                description: "Provincias argentinas con cobertura completa"
              },
              {
                icon: TrendingUp,
                number: "99.9%",
                title: "Precisión",
                description: "Tasa de precisión en nuestras respuestas legales"
              },
              {
                icon: Zap,
                number: "<3s",
                title: "Tiempo de Respuesta",
                description: "Respuesta promedio a consultas complejas"
              },
              {
                icon: Award,
                number: "4.9/5",
                title: "Calificación",
                description: "Puntuación promedio de nuestros usuarios"
              }
            ].map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-primary/10">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{achievement.number}</div>
                  <h3 className="font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
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
            Únete a Nuestra Misión
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Forma parte de la revolución en el acceso a información jurídica argentina. 
            Comienza tu prueba gratuita hoy mismo.
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
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Conocer al Equipo
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Equipo argentino</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Soporte local</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Tecnología propia</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}