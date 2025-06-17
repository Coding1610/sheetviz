import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import logo from '../assets/file.png'
import { Button } from './ui/button';
import { RouteIndex, RouteSignIn } from '@/helpers/RouteName';
import { LayoutDashboard, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminRouteProtection() {

    const user = useSelector((state) => state.user);

    if(user && user.isLoggedIn && user?.user?.role === 'Admin'){
        return (
            <Outlet/>
        )
    }
    else{
        return (
            <>
            {user?.isLoggedIn ?
                <>
                <div className="flex flex-col items-center gap-2 justify-center px-6 text-center font-roboto">
                    <div className="animate-bounce">
                        <img src={logo} className='w-12 h-12'/>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Access Denied – Admins only</h2>
                    <p className="text-gray-500 text-lg">You do not have the required permissions to access this page</p>
                    <Button className="bg-darkRed hover:bg-midRed mt-2">
                        <Link to={RouteIndex} className="flex gap-2 items-center justify-center">
                            <LayoutDashboard/>
                            Go to Dashboard
                        </Link>
                    </Button>
                </div>
                </>
                :
                <>
                <div className="flex flex-col items-center gap-2 justify-center px-6 text-center font-roboto">
                    <div className="animate-bounce">
                        <img src={logo} className='w-12 h-12'/>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Sign-In to access this page</h2>
                    
                    <Button className="bg-darkRed hover:bg-midRed mt-2">
                        <Link to={RouteSignIn} className="flex gap-2 items-center justify-center">
                            <LogIn/>
                            Sign In
                        </Link>
                    </Button>
                </div>
                </>
            }
            </>
        )
    }
}