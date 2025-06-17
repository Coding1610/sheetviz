import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import logo from '../assets/file.png'

export default function ClientRouteProtection() {

    const user = useSelector((state) => state.user);

    if(user && user.isLoggedIn && user?.user?.role === 'User'){
        return (
            <Outlet/>
        )
    }
    else{
        return (
            <>
             <div className="flex flex-col items-center justify-center px-6 text-center font-roboto">
                <div className="animate-bounce mb-4">
                    <img src={logo} className='w-12 h-12'/>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Access Denied – Admins only</h2>
                <p className="text-gray-500 mt-2">You do not have the required permissions to access this page</p>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-darkRed to-midRed text-transparent bg-clip-text mb-3 pb-3">
                    SheetViz
                </h1>
            </div>
            </>
        )
    }
}