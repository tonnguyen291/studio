
'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, UserCircle, Shield, UserCog, KeyRound, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={user?.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard'} className="flex items-center gap-2 text-xl font-headline font-semibold text-primary">
          <Shield className="w-7 h-7" />
          <span>Receipt Shield</span>
        </Link>
        
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={`https://placehold.co/40x40.png?text=${user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}`} 
                    alt={user.name || user.email}
                    data-ai-hint="abstract letter" 
                  />
                  <AvatarFallback>
                    <UserCircle className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground hidden md:inline">{user.name || user.email}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email} ({user.role})
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile" passHref>
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Manage Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/change-password" passHref>
                <DropdownMenuItem>
                  <KeyRound className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
