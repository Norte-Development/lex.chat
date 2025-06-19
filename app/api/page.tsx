import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Code,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Globe,
  Key,
  Book,
  Terminal,
  FileText,
  Users,
} from "lucide-react"

export default function APIPage() {
  const apiFeatures = [
    {
      icon: Zap,
      title: "Respuestas Rápidas",
      description: "API REST con respuestas en menos de 2 segundos para consultas complejas",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Shield,
      title: "Autenticación Segura", 
      description: "Autenticación API Key con rate limiting y monitoreo de uso",
      color: "from-blue-500 to-primary"
    },
    {
      icon: Globe,
      title: "Escalabilidad",
      description: "Infraestructura que escala automáticamente según tu volumen de consultas",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: Code,
      title: "SDKs Disponibles",
      description: "Librerías oficiales para Python, JavaScript, PHP y más lenguajes",
      color: "from-purple-500 to-pink-600"
    }
  ]

  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/query",
      description: "Realizar consulta jurídica a la IA",
      params: ["query", "jurisdiction", "filters"]
    },
    {
      method: "GET", 
      path: "/api/v1/documents/{id}",
      description: "Obtener documento completo por ID",
      params: ["id", "format"]
    },
    {
      method: "GET",
      path: "/api/v1/search",
      description: "Búsqueda avanzada en base de datos",
      params: ["q", "type", "date_range", "jurisdiction"]
    },
    {
      method: "GET",
      path: "/api/v1/history",
      description: "Historial de consultas del usuario",
      params: ["limit", "offset", "date_from", "date_to"]
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
            API para Desarrolladores
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            Integra lex-ai.chat en tu Aplicación
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            API REST poderosa y fácil de usar para integrar inteligencia artificial jurídica 
            argentina directamente en tus aplicaciones y sistemas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600">
                <Key className="mr-2 w-5 h-5" />
                Solicitar API Key
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Book className="mr-2 w-4 h-4" />
              Ver Documentación
            </Button>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Características de la API</h2>
            <p className="text-xl text-muted-foreground">
              Todo lo que necesitas para integrar IA jurídica en tu aplicación
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {apiFeatures.map((feature, index) => (
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

      {/* API Endpoints */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Endpoints Principales</h2>
            <p className="text-xl text-muted-foreground">
              Los endpoints más importantes para comenzar rápidamente
            </p>
          </div>

          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <Card key={index} className="border-primary/10 hover:border-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <Badge 
                          variant={endpoint.method === "GET" ? "secondary" : "default"}
                          className={endpoint.method === "GET" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-muted-foreground mb-3">{endpoint.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.params.map((param, paramIndex) => (
                          <Badge key={paramIndex} variant="outline" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ejemplo de Código</h2>
            <p className="text-xl text-muted-foreground">
              Comenzar es súper simple - aquí tienes un ejemplo en Python
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-primary/10">
            <CardContent className="pt-6">
              <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
                <div className="text-gray-500 mb-4"># Instalar la librería oficial</div>
                <div className="text-white mb-4">pip install lex-ai-python</div>
                
                <div className="text-gray-500 mb-4"># Ejemplo básico de consulta</div>
                <div className="space-y-2">
                  <div><span className="text-purple-400">from</span> <span className="text-white">lex_ai</span> <span className="text-purple-400">import</span> <span className="text-white">LexAI</span></div>
                  <div></div>
                  <div><span className="text-blue-400">client</span> = <span className="text-white">LexAI</span>(<span className="text-yellow-400">api_key</span>=<span className="text-green-300">"tu-api-key"</span>)</div>
                  <div></div>
                  <div><span className="text-gray-500"># Realizar consulta jurídica</span></div>
                  <div><span className="text-blue-400">response</span> = <span className="text-blue-400">client</span>.<span className="text-white">query</span>(</div>
                  <div className="ml-4"><span className="text-yellow-400">query</span>=<span className="text-green-300">"¿Cuáles son los requisitos para un divorcio en Argentina?"</span>,</div>
                  <div className="ml-4"><span className="text-yellow-400">jurisdiction</span>=<span className="text-green-300">"CABA"</span></div>
                  <div>)</div>
                  <div></div>
                  <div><span className="text-purple-400">print</span>(<span className="text-blue-400">response</span>.<span className="text-white">answer</span>)</div>
                  <div><span className="text-purple-400">print</span>(<span className="text-blue-400">response</span>.<span className="text-white">sources</span>)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Precios de API</h2>
            <p className="text-xl text-muted-foreground">
              Precios transparentes basados en el volumen de consultas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Desarrollo",
                price: "Gratis",
                description: "Para probar y desarrollar",
                features: [
                  "100 consultas/mes",
                  "Soporte por email",
                  "Documentación completa",
                  "Rate limit: 10/min"
                ],
                buttonText: "Comenzar Gratis"
              },
              {
                name: "Producción",
                price: "$99/mes",
                description: "Para aplicaciones en producción",
                features: [
                  "10,000 consultas/mes",
                  "SLA 99.9%",
                  "Soporte prioritario",
                  "Rate limit: 100/min",
                  "Webhooks"
                ],
                buttonText: "Solicitar Acceso",
                featured: true
              },
              {
                name: "Empresarial",
                price: "Personalizado",
                description: "Para gran volumen",
                features: [
                  "Consultas ilimitadas",
                  "SLA 99.99%",
                  "Soporte dedicado",
                  "Rate limit personalizado",
                  "Implementación dedicada"
                ],
                buttonText: "Contactar Ventas"
              }
            ].map((plan, index) => (
              <Card key={index} className={`text-center ${plan.featured ? 'border-2 border-primary scale-105' : 'border-primary/10'}`}>
                <CardContent className="pt-8">
                  {plan.featured && (
                    <Badge className="mb-4 bg-gradient-to-r from-primary to-blue-600">Más Popular</Badge>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-2 text-primary">{plan.price}</div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.featured ? 'bg-gradient-to-r from-primary to-blue-600' : ''}`}
                    variant={plan.featured ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comenzar es Fácil</h2>
            <p className="text-xl text-muted-foreground">
              Tres pasos simples para integrar lex-ai.chat en tu aplicación
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Solicita tu API Key",
                description: "Regístrate y solicita acceso a nuestra API. Aprobación en menos de 24 horas.",
                icon: Key
              },
              {
                step: "2", 
                title: "Integra la API",
                description: "Usa nuestros SDKs oficiales o realiza llamadas HTTP directas a nuestros endpoints.",
                icon: Terminal
              },
              {
                step: "3",
                title: "¡Listo para Producción!",
                description: "Despliega tu aplicación con confianza. Monitoreo y soporte incluidos.",
                icon: CheckCircle
              }
            ].map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-primary/10 relative">
                <CardContent className="pt-12 pb-8">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 shadow-lg">
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

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary via-blue-600 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.1%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para Integrar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comienza hoy mismo y lleva la inteligencia artificial jurídica argentina 
            directamente a tu aplicación.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Key className="mr-2 w-5 h-5" />
                Solicitar API Key
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Book className="mr-2 w-4 h-4" />
              Documentación Técnica
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}