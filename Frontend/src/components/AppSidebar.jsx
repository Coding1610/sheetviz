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
import { House, SquareStack, Users, MessageCircleMore, NotepadText, FileUp, FileClock  } from 'lucide-react'
import { RouteIndex, RouteBlog, RouteCateDetails, RouteGetAllUsers, RouteGetComments, RouteUploadFile, RouteUploadedFiles } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import logo from '../assets/file.png'
import { LayoutDashboard } from 'lucide-react'

export default function AppSidebar() {

    const user = useSelector((state) => state.user);

    const {data:categoryData, loading} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/show-all`, {
        method:'get',
        credentials:'include'
    });

    if(loading) return <Loading/>

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
                                    <House className='text-darkRed'/>
                                    <Link to={RouteIndex} className='font-semibold font-raleway'> Home </Link>
                                </SidebarMenuButton>
                                
                                <SidebarMenuButton>
                                    <SquareStack className='text-darkRed'/>
                                    <Link to={RouteCateDetails} className='font-semibold font-raleway'> Categories </Link>
                                </SidebarMenuButton>

                                <SidebarMenuButton> 
                                    <NotepadText className='text-darkRed'/>
                                    <Link to={RouteBlog} className='font-semibold font-raleway'> Blogs </Link>
                                </SidebarMenuButton>

                                <SidebarMenuButton>
                                    <MessageCircleMore className='text-darkRed'/>
                                    <Link to={RouteGetComments} className='font-semibold font-raleway'> Comments </Link>
                                </SidebarMenuButton>

                                <SidebarMenuButton>
                                    <Users className='text-darkRed'/>
                                    <Link to={RouteGetAllUsers} className='font-semibold font-raleway'> Users </Link>
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