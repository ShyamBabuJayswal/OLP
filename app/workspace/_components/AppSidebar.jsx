import { Button } from "@/@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar>
     <SidebarHeader className={'p-4'}>
       <Image src={"/logo.svg"} alt='logo' width={130} height={120}/>
      </SidebarHeader>
      <SidebarContent>
         <SidebarGroup>
           <Button>Create New Course</Button>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
