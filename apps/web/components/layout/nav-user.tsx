"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@saas/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@saas/ui/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@saas/ui/components/ui/sidebar";
import { Spinner } from "@saas/ui/components/ui/spinner";
import { useIsMobile } from "@saas/ui/hooks/use-mobile";
import { redirect } from "next/navigation";
import { useState } from "react";
import { LuChevronsUpDown, LuLogOut } from "react-icons/lu";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export function NavUser() {
  const isMobile = useIsMobile();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isPending, setIsPending] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsPending(true);
    const { error } = await authClient.signOut();
    setIsPending(false);

    if (error) {
      toast.error(error.message ?? "An error occurred while logging out");
      return;
    }

    redirect("/login");
  };

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback className="rounded-lg">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <LuChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={handleLogout} disabled={isPending}>
              {isPending ? <Spinner /> : <LuLogOut />} Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
