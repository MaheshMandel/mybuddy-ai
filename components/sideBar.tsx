'use client';

import { cn } from '@/lib/utils';
import { Home, Plus, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
export const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const routes = [
    {
      icons: Home,
      href: '/',
      label: 'Home',
      pro: false,
    },
    {
      icons: Plus,
      href: '/myBuddy/new',
      label: 'Create',
      pro: true,
    },
    {
      icons: Settings,
      href: '/settings',
      label: 'Settings',
      pro: false,
    },
  ];

  interface IOnNavigate {
    url: string;
    pro: boolean;
  }

  const onNavigate = ({ url, pro }: IOnNavigate) => {
    // Check if Pro (Protected)
    return router.push(url);
  };
  return (
    <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
      <div className='p-3 flex flex-1 justify-center'>
        <div className='space-y-2'>
          {routes.map((route) => (
            <div
              onClick={() => onNavigate({ pro: route.pro, url: route.href })}
              key={route.href}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathName === route.href && 'bg-primary/10 text-primary'
              )}
            >
              <div className='flex flex-col gap-y-2 items-center flex-1'>
                <route.icons className='h-5 w-5' />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
