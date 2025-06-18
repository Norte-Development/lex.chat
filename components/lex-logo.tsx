import React from 'react';

interface LexLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export function LexLogo({ size = 'md', animated = true, className = '' }: LexLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl ${animated ? 'hover:scale-110 transition-all duration-300' : ''} relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 22h20L12 2z" fill="currentColor" opacity="0.1"/>
              <path d="M8 18h8M6 14h12M4 10h16" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            </svg>
          </div>
          
          {/* Main logo content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-white">
            {/* Stylized "L" with legal elements */}
            <div className="relative">
              <span className={`font-black ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-4xl'} leading-none`}>
                L
              </span>
              {/* Small scale of justice accent */}
              <div className={`absolute -top-1 -right-1 ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-300`}>
                <svg viewBox="0 0 12 12" fill="currentColor" className="w-full h-full">
                  <path d="M6 1L4 3h4l-2-2zM3 4h6l-1 6H4l-1-6zM2 8h8v1H2z" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Animated glow effect */}
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] animate-[shimmer_2s_infinite] rounded-2xl"></div>
          )}
        </div>
        
        {/* Status indicator */}
        <div className={`absolute -top-1 -right-1 ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-background ${animated ? 'animate-pulse' : ''}`}>
          <div className="w-full h-full bg-white/30 rounded-full animate-ping"></div>
        </div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className={`${textSizeClasses[size]} font-bold leading-none`}>
          <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            lex
          </span>
          <span className="text-muted-foreground">-</span>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-primary bg-clip-text text-transparent">
            ai
          </span>
          <span className="text-foreground/60">.chat</span>
        </span>
        {size !== 'sm' && (
          <div className={`${size === 'md' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-base'} text-muted-foreground font-medium leading-none mt-1`}>
            Legal AI Assistant
          </div>
        )}
      </div>
    </div>
  );
} 