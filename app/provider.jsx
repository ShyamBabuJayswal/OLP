"use client";
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {UserDetailContext} from "../context/UserDetailsContext.jsx"
import { SelectChapterIndexContext } from '@/context/SelectedChapterIndexContext.jsx';

function Provider({ children }) {
  const { user } = useUser();

  const [userDetail, setUserDetails] = useState();

  const[selectChapterIndex,setSelectChapterIndex] = useState(0);

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
      
      setUserDetails(result.data);
      
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetails}}>
    <SelectChapterIndexContext.Provider value={{selectChapterIndex,setSelectChapterIndex}} >
      <div>{children}</div>
    </SelectChapterIndexContext.Provider>
      
    </UserDetailContext.Provider>
  
  )
}

export default Provider;
