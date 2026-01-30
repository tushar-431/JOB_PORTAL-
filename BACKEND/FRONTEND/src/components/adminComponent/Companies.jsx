import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/useGetAllCompanies'

const Companies = () => {
  const navigate = useNavigate()
  useGetAllCompanies()
  const [input, setInput]= useState('')
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input className={"w-fit"} placeholder='Filter by Name' onChange={(e)=>setInput(e.target.value)} />
          <Button onClick={()=>navigate('/admin/companies/create')}>Add Company</Button>
        </div>
        <div>
          <CompaniesTable inputt={input} />
        </div>
      </div>
    </div>
  )
}

export default Companies