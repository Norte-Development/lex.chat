'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import type { Session } from 'next-auth';
import { Scale } from 'lucide-react';

function PureChatHeader({
  chatId,
  isReadonly,
  session,
}: {
  chatId: string;
  isReadonly: boolean;
  session: Session;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-gradient-to-r from-background via-background to-muted/20 backdrop-blur-sm border-b border-border/50 py-3 items-center px-4 md:px-6 gap-3 shadow-sm">
      <SidebarToggle />

      {/* Logo and Brand */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
          <Scale className="w-4 h-4 text-white" />
        </div>
        <div className="hidden md:block">
          <div className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            lex-ai.chat
          </div>
          <div className="text-xs text-muted-foreground">IA Jurídica Argentina</div>
        </div>
      </div>

      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-3 px-3 md:h-fit ml-auto md:ml-0 hover:bg-primary/5 border-primary/20 transition-all duration-300 hover:shadow-md"
              onClick={() => {
                router.push('/');
                router.refresh();
              }}
            >
              <PlusIcon />
              <span className="md:sr-only ml-2">Nueva Consulta</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Nueva Consulta Jurídica</TooltipContent>
        </Tooltip>
      )}


      <Button
        className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white hidden md:flex py-2 px-4 h-fit md:h-[38px] order-4 md:ml-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        asChild
      >
        <Link
          href="/landing"
          className="flex items-center space-x-2"
        >
          <Scale className="w-4 h-4" />
          <span className="font-semibold">Acerca de lex-ai</span>
        </Link>
      </Button>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader);
