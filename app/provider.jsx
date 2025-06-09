"use client";
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Provider({ children }) {
  const { user } = useUser();

  const {userDetail,setUserDetails}=useState();

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    try {
    const result = await axios.post('/api/user', {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress
      });
      console.log(result.data); 
      setUserDetails(result.data);
      
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <UserDetailsContext.Provider value={{userDetail,setUserDetails}}>
      <div>{children}</div>
    </UserDetailsContext.Provider>
  
  )
}

export default Provider;
