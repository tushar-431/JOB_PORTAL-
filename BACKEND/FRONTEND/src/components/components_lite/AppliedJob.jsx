
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const AppliedJob = () => {
  const {allAppliedJobs} = useSelector((store)=>store.job)
  
 
  return (
    <div>
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className={"text-right"}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs && allAppliedJobs.length >=0 ? allAppliedJobs.map((appliedJobs, index)=>(
            <TableRow key={index}>
              <TableCell>{appliedJobs?.createdAt?.split("T")[0]}</TableCell>
              <TableCell>{appliedJobs?.job?.title}</TableCell>
              <TableCell>{appliedJobs?.job?.company?.name}</TableCell>
              <TableCell className={"text-right"}><Badge className={`${appliedJobs?.status==='rejected' ? "bg-red-500" : appliedJobs?.status === 'accepted' ? 'bg-green-600' : 'bg-gray-500'}`}>{appliedJobs?.status}</Badge></TableCell>
            </TableRow>
          )):(
            <span className=''>You have not applied any job yet.</span>
          )}
        </TableBody>
      </Table>

    </div>
  )
}

export default AppliedJob