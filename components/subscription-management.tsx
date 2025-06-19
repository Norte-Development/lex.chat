'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  CreditCard,
  FileText,
  ExternalLink,
  Loader2,
  Calendar,
  DollarSign,
  Shield,
} from 'lucide-react';

interface SubscriptionManagementProps {
  className?: string;
}

export function SubscriptionManagement({ className }: SubscriptionManagementProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageBilling = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error('No portal URL returned');
      }

      // Open Stripe Customer Portal in new tab
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error accessing billing portal:', error);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Gestión de Suscripción</CardTitle>
            <CardDescription>
              Administra tu suscripción, método de pago y facturación
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">Plan Profesional</div>
                <div className="text-sm text-muted-foreground">Suscripción activa</div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
              Activo
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">$8 USD</div>
                <div className="text-xs text-muted-foreground">por mes</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Mensual</div>
                <div className="text-xs text-muted-foreground">Renovación automática</div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Gestionar Suscripción</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4" />
              <span>Actualizar método de pago</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Ver historial de facturación</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Settings className="w-4 h-4" />
              <span>Modificar o cancelar suscripción</span>
            </div>
          </div>

          <Button
            onClick={handleManageBilling}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 w-4 h-4" />
                Gestionar Facturación
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Serás redirigido al portal seguro de Stripe para gestionar tu suscripción
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 