import Form from 'next/form';
import { Scale } from 'lucide-react';

import { Input } from './ui/input';
import { Label } from './ui/label';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header with logo */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <Scale className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          lex-ai.chat
        </h1>
        <p className="text-sm text-muted-foreground mt-1">IA Jurídica Argentina</p>
      </div>

      <Form action={action} className="flex flex-col gap-6 px-4 sm:px-6 py-8 bg-gradient-to-br from-card via-card to-muted/20 rounded-2xl border border-border/50 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="email"
            className="text-foreground font-semibold text-sm"
          >
            Dirección de Email
          </Label>

          <Input
            id="email"
            name="email"
            className="bg-muted/50 border-border/50 hover:border-primary/50 focus:border-primary transition-all duration-300 text-md md:text-sm h-12 rounded-xl shadow-sm"
            type="email"
            placeholder="usuario@bufete.com"
            autoComplete="email"
            required
            autoFocus
            defaultValue={defaultEmail}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor="password"
            className="text-foreground font-semibold text-sm"
          >
            Contraseña
          </Label>

          <Input
            id="password"
            name="password"
            className="bg-muted/50 border-border/50 hover:border-primary/50 focus:border-primary transition-all duration-300 text-md md:text-sm h-12 rounded-xl shadow-sm"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        {children}
      </Form>

      {/* Professional footer */}
      <div className="text-center mt-6 text-xs text-muted-foreground">
        <p>Plataforma profesional para abogados argentinos</p>
        <p className="mt-1">Base de datos actualizada diariamente</p>
      </div>
    </div>
  );
}
