'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  CheckCircleFillIcon,
  ChevronDownIcon,
  GlobeIcon,
  LockIcon,
} from './icons';
import { useChatVisibility } from '@/hooks/use-chat-visibility';

export type VisibilityType = 'private' | 'public';

const visibilities: Array<{
  id: VisibilityType;
  label: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: 'private',
    label: 'Privada',
    description: 'Solo tú puedes acceder a esta consulta',
    icon: <LockIcon />,
  },
  {
    id: 'public',
    label: 'Pública',
    description: 'Cualquiera con el enlace puede acceder a esta consulta',
    icon: <GlobeIcon />,
  },
];

export function VisibilitySelector({
  chatId,
  className,
  selectedVisibilityType,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);

  const { visibilityType, setVisibilityType } = useChatVisibility({
    chatId,
    initialVisibilityType: selectedVisibilityType,
  });

  const selectedVisibility = useMemo(
    () => visibilities.find((visibility) => visibility.id === visibilityType),
    [visibilityType],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`gap-2 px-3 h-fit hover:bg-primary/5 border-primary/20 transition-all duration-300 hover:shadow-md ${className}`}
        >
          <div className="w-4 h-4 text-primary">
            {selectedVisibility?.icon}
          </div>
          <span className="text-sm font-medium">
            {selectedVisibility?.label}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-64 bg-gradient-to-br from-card to-muted/20 border border-border/50 shadow-xl backdrop-blur-sm"
      >
        {visibilities.map((visibility) => (
          <DropdownMenuItem
            key={visibility.id}
            onSelect={() => setVisibilityType(visibility.id)}
            className="flex items-start gap-3 p-4 hover:bg-primary/5 transition-colors duration-300 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 text-primary">
                {visibility.icon}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-sm">{visibility.label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {visibility.description}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
