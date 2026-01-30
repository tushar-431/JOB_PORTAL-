import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobTable = ({inputt}) => {
  const navigate = useNavigate()
    const { companies }  = useSelector((store)=> store.company)
    
    const {allAdminJobs} = useSelector((store)=>store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    console.log("alladminjobs",allAdminJobs)
    useEffect(()=>{
        const filteredJobs = allAdminJobs.length>0 && allAdminJobs.filter((job)=>{
            if(!inputt){
                return true
            }
            return job.title?.toLowerCase().includes(inputt.toLowerCase()) || job?.company?.name?.toLowerCase().includes(inputt.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    },[inputt, allAdminJobs])
  return (
    <div>
        <div>
            <Table>
                  <TableCaption>Your recent posted jobs</TableCaption>
                  <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={"text-right"}>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  
                    {filterJobs && filterJobs.length > 0 ? (
                        <>
                            {filterJobs?.map((job, index)=>{
                                console.log(job)
                            return (
                                <TableBody key={index}>
                                    
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell>{job.title}</TableCell>
                                    <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className={"text-right "}>
                                        <Popover className="cursor-pointer">
                                            <PopoverTrigger className="cursor-pointer" >
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className={"w-32"}>
                                                <div 
                                                onClick={()=>navigate(`/admin/companies/${job._id}`)}
                                                className='flex items-center gap-2 w-fit cursor-pointer mb-1'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <hr />
                                                <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer mt-1'>
                                                    <Eye className='w-4'></Eye>
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableBody>
                            )
                        })}
                        </>
                        
                    ) : (
                        <TableBody>
                            <span>No Companies Added</span>
                        </TableBody>
                    )}
                  
            </Table>
        </div>
    </div>
  )
}

export default AdminJobTable