import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import { House, Users, FileUp, FileClock  } from 'lucide-react'
import { RouteIndex, RouteGetAllUsers, RouteUploadFile, RouteUploadedFiles, RouteGetAllFiles } from '@/helpers/RouteName'
import { useSelector } from 'react-redux'
import logo from '../assets/file.png'
import { Files, LayoutDashboard } from 'lucide-react'

export default function AppSidebar() {

    const user = useSelector((state) => state.user);

    return (
    <>
    <Sidebar>
      <SidebarHeader className="bg-white flex justify-center text-darkRed pl-5 pt-4">
            <Link to={RouteIndex} className="flex items-center gap-3 font-roboto font-bold text-2xl text-darkRed">
                <div>
                    <img src={logo} className='w-8 h-8'/>
                </div>
                <p className="bg-gradient-to-r from-darkRed to-midRed text-transparent bg-clip-text">SheetViz</p>
            </Link>
      </SidebarHeader>
            <SidebarContent className="bg-white">
                <SidebarGroup className="pt-5">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            
                        {user && user.isLoggedIn ? (
                            user?.user?.role === 'User' ? (
                                // Content for 'User' role
                                <>
                                <SidebarMenuButton>
                                    <LayoutDashboard className='text-darkRed'/>
                                    <Link to={RouteIndex} className='font-semibold font-raleway'> Dashboard </Link>
                                </SidebarMenuButton>

                                <SidebarMenuButton>
                                    <FileUp className='text-darkRed'/>
                                    <Link to={RouteUploadFile } className='font-semibold font-raleway'>Upload New File</Link>
                                </SidebarMenuButton>

                                <SidebarMenuButton>
                                    <FileClock className='text-darkRed'/>
                                    <Link to={RouteUploadedFiles} className='font-semibold font-raleway'>Uploaded Files</Link>
                                </SidebarMenuButton>

                                </>
                            ) : (
                                // Content for other roles (e.g., Admin)
                                <>
                                <SidebarMenuButton>
                                    <LayoutDashboard className='text-darkRed'/>
                                    <Link to={RouteIndex} className='font-semibold font-raleway'> Dashboard </Link>
                                </SidebarMenuButton>
                                
                                <SidebarMenuButton>
                                    <Users className='text-darkRed'/>
                                    <Link to={RouteGetAllUsers} className='font-semibold font-raleway'> Users </Link>
                                </SidebarMenuButton>

                                <SidebarMenuButton>
                                    <Files className='text-darkRed'/>
                                    <Link to={RouteGetAllFiles} className='font-semibold font-raleway'> Files </Link>
                                </SidebarMenuButton>
                                </>
                            )
                            ) : (
                            // Content when user is not logged in
                            <>
                                <SidebarMenuButton>
                                    <House className='text-darkRed'/>
                                    <Link to="/" className='font-semibold font-raleway'> Home </Link>
                                </SidebarMenuButton>
                            </>
                        )}

                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
    </Sidebar>
    </>
  )
}