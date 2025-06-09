"use client";
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect } from 'react';

function Provider({ children }) {
  const { user } = useUser();

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
      
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
