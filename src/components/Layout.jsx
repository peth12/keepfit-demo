import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { useSelector } from "react-redux";

export const Layout = ({children}) => {

  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
    <div className="h-screen">

    <Navbar userData={user}/> 
    <div className="h-[80vh]">
    {children}
    </div>
    </div>
    </>
  )
}
