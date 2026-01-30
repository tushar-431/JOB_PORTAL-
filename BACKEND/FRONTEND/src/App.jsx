import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpIcon } from 'lucide-react'
import Navbar from './components/components_lite/Navbar'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/components_lite/Home'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy'
import TermOfServices from './components/components_lite/TermOfServices'
import Jobs from './components/components_lite/Jobs'
import Browse from './components/components_lite/Browse'
import Profile from './components/components_lite/Profile'
import Description from './components/components_lite/Description'
import Companies from './components/adminComponent/Companies'
import CompanyCreate from './components/adminComponent/CompanyCreate'
import CompanySetup from './components/adminComponent/CompanySetup'
import AdminJobs from './components/adminComponent/AdminJobs'
import PostJob from './components/adminComponent/PostJob'
import Applicants from './components/adminComponent/Applicants'
import ProtectedRoute from './components/adminComponent/ProtectedRoute'

const appRouter = createBrowserRouter([
  {path: "/", element: <Home />},
  {
    path: "/Home",
    element: <Home />,
  },
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  {path: "/privacyPolicy", element: <PrivacyPolicy />},
  {path: "/termOfService", element: <TermOfServices />},
  {path: "/jobs", element: <Jobs />},
  {path: "/browse", element: <Browse />},
  {path: "/profile", element: <Profile />},
  {path: "/description/:id", element: <Description />},
  {path: "/admin/companies", element: <ProtectedRoute><Companies /></ProtectedRoute> },
  {path: "/admin/companies/create", element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>},
  {path: "/admin/companies/:id", element: <ProtectedRoute><CompanySetup /></ProtectedRoute>},
  {path: "/admin/jobs", element: <ProtectedRoute><AdminJobs /></ProtectedRoute>},
  {path: "/admin/jobs/create", element: <ProtectedRoute><PostJob /></ProtectedRoute>},
  {path: "/admin/jobs/:id/applicants", element: <ProtectedRoute><Applicants /></ProtectedRoute>}
])

function App() {
  
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )    
}

export default App