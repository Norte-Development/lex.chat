import type { Chat } from '@/lib/db/schema';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  CheckCircleFillIcon,
  GlobeIcon,
  LockIcon,
  MoreHorizontalIcon,
  ShareIcon,
  TrashIcon,
} from './icons';
import { memo } from 'react';
import { useChatVisibility } from '@/hooks/use-chat-visibility';

const PureChatItem = ({
  chat,
  isActive,
  onDelete,
  setOpenMobile,
}: {
  chat: Chat;
  isActive: boolean;
  onDelete: (chatId: string) => void;
  setOpenMobile: (open: boolean) => void;
}) => {
  const { visibilityType, setVisibilityType } = useChatVisibility({
    chatId: chat.id,
    initialVisibilityType: chat.visibility,
  });

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-blue-500/5 transition-all duration-300 rounded-xl"
      >
        <Link 
          href={`/chat/${chat.id}`} 
          onClick={() => setOpenMobile(false)}
          className="flex items-center space-x-3 p-3 group"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-blue-600 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-sm font-medium group-hover:text-foreground transition-colors truncate">
            {chat.title}
          </span>
        </Link>
      </SidebarMenuButton>

      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction
            className="data-[state=open]:bg-primary/10 data-[state=open]:text-primary mr-0.5 hover:bg-primary/5 transition-all duration-300"
            showOnHover={!isActive}
          >
            <MoreHorizontalIcon />
            <span className="sr-only">Más opciones</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          side="bottom" 
          align="end"
          className="bg-gradient-to-br from-card to-muted/20 border border-border/50 shadow-xl backdrop-blur-sm"
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer hover:bg-primary/5 transition-colors">
              <ShareIcon />
              <span>Compartir</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-gradient-to-br from-card to-muted/20 border border-border/50 shadow-xl">
                <DropdownMenuItem
                  className="cursor-pointer flex-row justify-between hover:bg-primary/5 transition-colors"
                  onClick={() => {
                    setVisibilityType('private');
                  }}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded flex items-center justify-center">
                      <LockIcon size={12} />
                    </div>
                    <span>Privada</span>
                  </div>
                  {visibilityType === 'private' ? (
                    <CheckCircleFillIcon />
                  ) : null}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex-row justify-between hover:bg-primary/5 transition-colors"
                  onClick={() => {
                    setVisibilityType('public');
                  }}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-500/20 to-primary/20 rounded flex items-center justify-center">
                      <GlobeIcon />
                    </div>
                    <span>Pública</span>
                  </div>
                                     {visibilityType === 'public' ? <CheckCircleFillIcon /> : null}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem
            className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 transition-colors"
            onSelect={() => onDelete(chat.id)}
          >
            <div className="w-4 h-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded flex items-center justify-center mr-2">
              <TrashIcon />
            </div>
            <span>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export const ChatItem = memo(PureChatItem, (prevProps, nextProps) => {
  if (prevProps.isActive !== nextProps.isActive) return false;
  return true;
});

export const SidebarHistoryItem = ChatItem;
