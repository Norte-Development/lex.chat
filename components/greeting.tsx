import { motion } from 'framer-motion';
import { Scale, Sparkles } from 'lucide-react';

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="max-w-4xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center relative"
    >
      {/* Background gradient elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="relative z-10">
        {/* Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <Scale className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Main greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
            ¡Hola!
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-center mb-8"
        >
          <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
            ¿Cómo puedo ayudarte con tu consulta jurídica?
          </span>
        </motion.div>

        {/* Features hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center text-sm text-muted-foreground"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-primary/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span>IA especializada en derecho argentino</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
              <Scale className="w-4 h-4 text-emerald-600" />
            </div>
            <span>Base de datos actualizada diariamente</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
