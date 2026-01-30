import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from "lucide-react";
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '../../utils/data';
import { useSelector } from 'react-redux';
import useGetAllAppliedJobs from '../hooks/useGetAllAppliedJobs';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const {applicants} = useSelector(store => store.application)

    const statusHandler = async (status, id)=>{
        
        try {
            axios.defaults.withCredentials=true
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,
                {status}
            )
            console.log(res)
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

  return (
    <div>
        <Table>
            <TableCaption>
                List of your recent applied Users
            </TableCaption>
            <TableRow>
                <TableHead>Fullname</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className={"text-right"}>Action</TableHead>
            </TableRow>
            <TableBody>
                {applicants && applicants?.applications?.map((item, index)=>(
                    <tr key={index}>
                        <TableCell>{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell>
                            {item.applicant?.profile?.resume ? (
                                <a href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer' className='text-blue-600 cursor-pointer'>
                                    {/* {item.applicants?.profile?.resume} */}
                                </a>
                            ):(
                                <span>NA</span>
                            )}
                        </TableCell>
                        <TableCell>{item.applicant?.createdAt.split("T")[0]}</TableCell>
                        
                        <TableCell className={"float-right"}>
                            <Popover>
                                <PopoverTrigger className='cursor-pointer'>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className={"w-32 "}>
                                    {shortlistingStatus.map((status, index)=>{
                                        return (
                                            <div key={index} onClick={()=>statusHandler(status,item?._id)} >
                                                <input type="radio" name='shortlistingStatus' value={status} className='cursor-pointer'/>
                                                {status}
                                            </div>
                                        )
                                    })}
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </tr>
                ))}
                
            </TableBody>
        </Table>
    </div>
  )
}

export default ApplicantsTable