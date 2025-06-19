import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Scale,
  Play,
  MessageSquare,
  FileText,
  Clock,
  Search,
  BookOpen,
  Brain,
  Zap,
  Target,
  Globe,
} from "lucide-react"

export default function DemoPage() {
  const demoQueries = [
    {
      question: "¿Cuáles son los requisitos para un divorcio por mutuo acuerdo en Argentina?",
      response: "Según el Código Civil y Comercial de la Nación (artículo 435), el divorcio por mutuo acuerdo requiere:\n\n• Presentación conjunta de la solicitud\n• Acuerdo sobre los efectos del divorcio\n• Transcurso de 3 meses desde la celebración del matrimonio\n• Comparencia personal ante el juez\n\nFuente: Código Civil y Comercial, Libro II, Título I, Capítulo 8"
    },
    {
      question: "¿Qué derechos tiene un trabajador en caso de despido sin causa?",
      response: "Conforme a la Ley de Contrato de Trabajo 20.744, el trabajador tiene derecho a:\n\n• Preaviso (artículo 231)\n• Integración del mes de despido (artículo 233)\n• Indemnización por antigüedad (artículo 245)\n• Indemnización sustitutiva de preaviso si corresponde\n• SAC proporcional\n\nFuente: Ley 20.744 - Ley de Contrato de Trabajo"
    },
    {
      question: "¿Cuál es el plazo de prescripción para reclamos laborales?",
      response: "El artículo 256 de la Ley de Contrato de Trabajo establece:\n\n• 2 años: para reclamos por diferencias salariales, vacaciones no gozadas, SAC\n• 2 años: para acciones por accidentes de trabajo y enfermedades profesionales\n• El plazo se cuenta desde que la obligación se hizo exigible\n\nFuente: Ley 20.744, art. 256 y Ley 24.557, art. 44"
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
            Demo Interactivo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            Ve lex-ai.chat en Acción
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explora cómo lex-ai.chat puede transformar tu práctica legal con ejemplos reales 
            de consultas y respuestas precisas basadas en la legislación argentina.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                <Sparkles className="mr-2 w-5 h-5" />
                Probar Gratis Ahora
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="hover:bg-primary/5">
              <Play className="mr-2 w-4 h-4" />
              Ver Video Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Zap,
                title: "Respuestas Instantáneas",
                description: "Obtén respuestas precisas en segundos",
                color: "from-yellow-500 to-orange-600"
              },
              {
                icon: Target,
                title: "Citas Exactas",
                description: "Referencias directas a artículos y normativas",
                color: "from-blue-500 to-primary"
              },
              {
                icon: Globe,
                title: "Cobertura Nacional",
                description: "Todas las jurisdicciones argentinas",
                color: "from-emerald-500 to-green-600"
              },
              {
                icon: Brain,
                title: "IA Especializada",
                description: "Entrenada específicamente en derecho argentino",
                color: "from-purple-500 to-pink-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-primary/10">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Consultas Reales, Respuestas Precisas</h2>
            <p className="text-xl text-muted-foreground">
              Estos son ejemplos reales de consultas y las respuestas que proporciona lex-ai.chat
            </p>
          </div>

          <div className="space-y-8">
            {demoQueries.map((demo, index) => (
              <Card key={index} className="overflow-hidden border-primary/10 hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    {/* Question */}
                    <div className="p-8 bg-gradient-to-br from-primary/5 to-blue-500/5 border-r border-border/50">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-3 text-primary">Consulta #{index + 1}</h3>
                          <p className="text-foreground leading-relaxed">{demo.question}</p>
                        </div>
                      </div>
                    </div>

                    {/* Response */}
                    <div className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-3 text-emerald-600">Respuesta de lex-ai</h3>
                          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {demo.response}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
              ✓ Todas las respuestas incluyen referencias exactas a la legislación
            </Badge>
            <br />
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600">
                Hacer tu Primera Consulta
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Cómo Funciona</h2>
            <p className="text-xl text-muted-foreground">
              Tres pasos simples para obtener respuestas jurídicas precisas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Haz tu Consulta",
                description: "Escribe tu pregunta legal en lenguaje natural. No necesitas usar terminología técnica específica.",
                icon: MessageSquare,
                color: "from-blue-500 to-primary"
              },
              {
                step: "2",
                title: "IA Analiza",
                description: "Nuestra IA especializada busca en toda la base de datos jurídica argentina para encontrar la respuesta exacta.",
                icon: Brain,
                color: "from-purple-500 to-pink-600"
              },
              {
                step: "3",
                title: "Recibe Respuesta",
                description: "Obtén una respuesta completa con citas exactas, artículos relevantes y enlaces a las fuentes oficiales.",
                icon: CheckCircle,
                color: "from-emerald-500 to-green-600"
              }
            ].map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-primary/10 relative">
                <CardContent className="pt-12 pb-8">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                  </div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Video Demostración</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Ve lex-ai.chat en acción con una demostración completa de 3 minutos
          </p>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20">
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Demo Video</h3>
                <p className="text-muted-foreground">3:24 minutos</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600">
                Comenzar mi Prueba Gratuita
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary via-blue-600 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.1%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para Probarlo?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a cientos de abogados que ya optimizaron su trabajo con lex-ai.chat. 
            Comienza tu prueba gratuita de 7 días ahora.
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
                Solicitar Demo Personalizada
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Acceso completo 7 días</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Soporte incluido</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}