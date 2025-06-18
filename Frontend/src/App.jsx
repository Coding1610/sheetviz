import './index.css'
import React from 'react'
import Layout from './layout/Layout'

import Profile from './pages/Profile'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RouteLandingPage, RouteIndex, RouteSignIn, RouteSignUp, RouteGetAllUsers, RouteProfileUser, RouteProfileAdmin, RouteNotFound, RouteUploadFile, RouteChartVisualization, RouteFileView, RouteUploadedFiles, RouteGetAllFiles } from './helpers/RouteName'
import GetAllUsers from './pages/GetAllUsers'
import ClientRouteProtection from './components/ClientRouteProtection'
import AdminRouteProtection from './components/AdminRouteProtection'
import NotFound from './pages/NotFound'
import LandingPage from './pages/LandingPage'
import UploadForm from './components/FileUpload/UploadForm'
import Visualization from './pages/Visualization'
import Dashboard from './components/Dashboard/Dashboard'
import FileView from './pages/FileView'
import UploadedFiles from './pages/UploadedFiles'
import GetAllFiles from './pages/GetAllFiles'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

            <Route path={RouteLandingPage} element={<LandingPage/>} />
            
            <Route path={RouteIndex} element={<Layout/>}>

              {/* Home Page Route */}
              <Route path={RouteIndex} element={<Dashboard/>} />
              {/* when you want to make any default page then set "index" to it*/}
              
              {/* Client Routes */}
              <Route element={<ClientRouteProtection/>} >
                <Route path={RouteProfileUser} element={<Profile/>} />
                <Route path={RouteUploadFile} element={<UploadForm/>} />
                <Route path={RouteChartVisualization()} element={<Visualization/>} />
                <Route path={RouteFileView()} element={<FileView/>} />
                <Route path={RouteUploadedFiles} element={<UploadedFiles/>} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminRouteProtection/>} >
                <Route path={RouteProfileAdmin} element={<Profile/>}/>
                <Route path={RouteGetAllUsers} element={<GetAllUsers/>}/>
                <Route path={RouteGetAllFiles} element={<GetAllFiles/>} />
              </Route>

            </Route>

            {/* Authentication Routes */}
            <Route path={RouteSignIn} element={<SignIn/>} />
            <Route path={RouteSignUp} element={<SignUp/>} />

            {/* 404 Not Found Page */}
            <Route path={RouteNotFound} element={<NotFound/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}