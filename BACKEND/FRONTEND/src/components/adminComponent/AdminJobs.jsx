import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import AdminJobTable from './AdminJobTable'
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs'

const AdminJobs = () => {
  const navigate = useNavigate()
  const [input, setInput]= useState('')
  useGetAllAdminJobs()
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input className={"w-fit"} placeholder='Filter by Name & Jobs' onChange={(e)=>setInput(e.target.value)} />
          <Button onClick={()=>navigate('/admin/jobs/create')}>Post New Job</Button>
        </div>
        <div>
          <AdminJobTable inputt={input} />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs