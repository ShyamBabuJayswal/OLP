"use client"
import { Button } from "@/@/components/ui/button";
import { SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
 

} from "@/components/ui/sidebar";
import { Book, Compass, LayoutDashboard, PencilRulerIcon, PercentCircleIcon, UserCircle2Icon, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NewCourseDailogBox from "./NewCourseDailogBox";

 const SideBarOptions=[
    {
      title:'Dashboard',
      icon:LayoutDashboard,
      path:"/workspace"
    },
     {
      title:'My Learning',
      icon:Book,
      path:"/workspace/my-learning"
    },
     {
      title:'Explore Courses',
      icon:Compass,
      path:"/workspace/explore-course"
    },
     {
      title:'AI Tools',
      icon:PencilRulerIcon,
      path:"/workspace/ai-tools"
    },
     {
      title:'Billing',
      icon:WalletCards,
      path:"/workspace/billing"
    },
     {
      title:'Profile',
      icon:UserCircle2Icon,
      path:"/workspace/profile"
    },
  ]



export function AppSidebar() {
  const path=usePathname();
 
  return (
    <Sidebar>
     <SidebarHeader className={'p-4'}>
       <Image src={"/logo.svg"} alt='logo' width={130} height={120}/>
      </SidebarHeader>
      <SidebarContent>
         <SidebarGroup>
          <NewCourseDailogBox>

        
           <Button>Create New Course</Button>
             </NewCourseDailogBox>
        </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {SideBarOptions.map((item,index)=>(
                  <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="p-7">
                    <Link href={item.path} className={`text-[17px] ${path.includes(item.path) && 'text-primary bg-purple-50'}`}>
                      <item.icon className="h-7 w-7"/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
