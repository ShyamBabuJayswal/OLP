import React from 'react'
import  WorkSpaceProvider from "./provider"

function Workspacelayout({children}) {
  return (
    <WorkSpaceProvider>
      {children}
    </WorkSpaceProvider>
  )
}

export default Workspacelayout