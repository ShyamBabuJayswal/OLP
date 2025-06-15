
import React from 'react'
import {AppSidebar} from './_components/AppSidebar';
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar';
import AppHeader from './_components/AppHeader';




function WorkSpaceProvider({children}) {
  return (
     <SidebarProvider>
     <AppSidebar />
     
      <div className="w-full">
      <AppHeader/>
      
      {children}</div>
     </SidebarProvider>
      
    
  
    
  
  )
}

export default WorkSpaceProvider