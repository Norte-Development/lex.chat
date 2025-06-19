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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Lex AI Chat
        </h1>
        <p className="text-sm text-muted-foreground mt-1">IA Jurídica Argentina</p>
      </div>

      <Form action={action} className="flex flex-col gap-6 px-4 sm:px-6 py-8 bg-gradient-to-br from-card via-card to-muted/20 rounded-2xl border border-border/50 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground/80"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            className="bg-background/60 border-border/50 focus:border-primary/50 transition-all duration-200"
            placeholder="nombre@ejemplo.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
            autoFocus
            defaultValue={defaultEmail}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground/80"
          >
            Contraseña
          </Label>
          <Input
            id="password"
            name="password"
            className="bg-background/60 border-border/50 focus:border-primary/50 transition-all duration-200"
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {children}
      </Form>

      {/* Professional footer */}
      <div className="text-center mt-6 text-xs text-muted-foreground">
        <p>Plataforma profesional para abogados argentinos</p>
        <p className="mt-1">Cumplimiento normativo y confidencialidad garantizada</p>
      </div>
    </div>
  );
}
