import React, { useState } from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {  Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import AppliedJob from './AppliedJob'
import EditProfileModel from './EditProfileModel'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '../hooks/useGetAllAppliedJobs'

// const skills = [
//   "Python Programming",
//   "JavaScript",
//   "SQL Database Management",
//   "HTML/CSS",
//   "Cloud Computing (AWS/Azure)",
//   "Cybersecurity Fundamentals",
//   "Git & Version Control",
//   "Linux Command Line",
//   "Data Structures & Algorithms",
//   "API Development",
//   "DevOps (Docker/Jenkins)",
//   "Machine Learning Basics",
//   "Networking (TCP/IP)",
//   "Agile Methodology",
//   "Technical Troubleshooting",
//   "Data Visualization (Tableau/Power BI)",
//   "Front-End Frameworks (React/Vue)",
//   "Backend Frameworks (Node.js/Django)",
//   "Software Testing",
//   "Project Management"
// ];
const isResume=true

const Profile = () => {
  useGetAllAppliedJobs()
  const [open, setOpen] = useState(false)
  const {user} = useSelector((store)=>store.auth)

  return (
    <div>
      <Navbar />

      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-5'>
            <Avatar className={"cursor-pointer h-24 w-24"}>
              <AvatarImage src={`${user?.profile?.profilePhoto}`} alt="@shadcn"></AvatarImage>
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>
                {user?.profile?.bio} 
              </p>
            </div>
          </div>
          <Button onClick={() => {setOpen(true)}}  className={"text-right"} variant='outline'>
            <Pen />
          </Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span className=''><a href={`mailto:${user?.email}`}>{user?.email}</a></span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span className=''><a href={`tel:${user?.phonenumber}`}>{user?.phonenumber}</a></span>
          </div>
        </div>


        <div>
          <div className='my-5'>
            <h1>Skills</h1>
            <div  className='flex flex-wrap items-center gap-1 '>
              {( user?.profile?.skills && user?.profile?.skills.length !== 0 ) ? (
                user?.profile?.skills.map((item, index)=> <Badge key={index}>{item}</Badge>)
              ) : (
                <span>NA</span>
              ) }
            </div>
          </div>
        </div>

      

      <div >
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <label htmlFor="" className='text-md font-bold'>Resume</label>
          <div>
            {isResume ? (
              <a href={`${user?.profile?.resume}`} target='_blank' className='text-blue-600 hover:underline cursor-pointer'>
                {user?.profile?.resumeOriginalname}
              </a>
            ) : (
              <span>No Resume Found</span>
            ) } 
          </div>
        </div>
      </div>
      </div>
      

      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='text-lg my-5 font-bold'>Applied Jobs</h1>

        {/* Add Application Table */}
        <AppliedJob />
      </div>
      
      {/* Edit Profile Model */} 
        <EditProfileModel open={open} setOpen={setOpen} />
    </div>
    
  )
}

export default Profile