'use client';

import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/icons';
import { SidebarHistory } from '@/components/sidebar-history';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Scale, Sparkles } from 'lucide-react';

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0 bg-gradient-to-b from-sidebar-background via-sidebar-background to-muted/30">
      <SidebarHeader className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-transparent border-b border-border/50">
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center p-2">
            <Link
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
              className="flex flex-row gap-3 items-center group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  lex-ai.chat
                </div>
                <div className="text-xs text-muted-foreground">IA Jurídica Argentina</div>
              </div>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="p-2 h-fit hover:bg-primary/10 hover:shadow-md transition-all duration-300 group"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push('/');
                    router.refresh();
                  }}
                >
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end">Nueva Consulta Jurídica</TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 bg-gradient-to-r from-muted/30 to-transparent">
        {user && <SidebarUserNav user={user} />}
        
        {/* Professional badge */}
        <div className="px-4 py-2">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-primary/10 via-blue-500/10 to-emerald-500/10 border border-primary/20 rounded-full px-3 py-2 text-xs">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground font-medium">IA Especializada</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
