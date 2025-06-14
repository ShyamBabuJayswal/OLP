
import React from 'react'
import {AppSidebar} from './_components/AppSidebar';
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar';




function WorkSpaceProvider({children}) {
  return (
     <SidebarProvider>
     <AppSidebar />
      <SidebarTrigger />
      <div>{children}</div>
     </SidebarProvider>
      
    
  
    
  
  )
}

export default WorkSpaceProvider