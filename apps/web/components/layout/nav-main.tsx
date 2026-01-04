"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@saas/ui/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@saas/ui/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChevronRight, LuLayoutDashboard, LuSettings } from "react-icons/lu";

interface SubItem {
  title: string;
  url: string;
}

interface Item {
  title: string;
  url: string;
  icon: React.ElementType;
  items?: SubItem[];
}

interface ItemGroup {
  title: string;
  items: Item[];
}

const itemGroups: ItemGroup[] = [
  {
    title: "Platform",
    items: [
      {
        title: "Dashboard",
        url: "/app/dashboard",
        icon: LuLayoutDashboard,
      },
      {
        title: "Settings",
        url: "/app/settings",
        icon: LuSettings,
        items: [
          {
            title: "Personal",
            url: "/app/settings/personal",
          },
          {
            title: "Account",
            url: "/app/settings/account",
          },
          {
            title: "Billing",
            url: "/app/settings/billing",
          },
          {
            title: "Notifications",
            url: "/app/settings/notifications",
          },
        ],
      },
    ],
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      {itemGroups.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <Collapsible
                key={item.title}
                render={
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      render={
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger
                          render={
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                              <LuChevronRight />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          }
                        />
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  render={
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  }
                                />
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                }
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
