import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '../../utils/data'
import { setAllJobs, setSingleJob } from '../../redux/jobSlice'
import { toast } from 'sonner'

const Description = () => {

    const params = useParams()
    const jobId = params.id


    const {singleJob} = useSelector((store)=>store.job)
    const {user} = useSelector((store)=>store.auth)
    const job = singleJob

        const dispatch = useDispatch()
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)

        
    
    
    const isIntiallyApplied = singleJob?.application?.some(
        (application)=> application.applicant ===  user?._id
    ) || false
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)
    
    const applyJobHandler = async() => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true })
            console.log("res: ", res)
            if(res.data.success){
                setIsApplied(true)
                const updateSingleJob = { ...singleJob, applications:[...singleJob.applications, {applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob))
                console.log(res.data);
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.success(res.data.message)
        }
    }

    useEffect(()=>{
            const fetchSingleJobs =  async()=>{
                setLoading(true)
                setError(null)
                try {
                    const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {withCredentials:true})
                    console.log("Api response: ", res)
                    if(res.data.status){
                        dispatch(setSingleJob(res.data.job))
                        setIsApplied(
                            res.data.job.applications.some(
                                (application)=>application.applicant === user?._id
                            )
                        )
                    }else{
                        setError("Failed to fetch jobs.")
                    }
                } catch (error) {
                    console.error("Fetch Error: ",error)
                    setError(error.message || 'An error occured.')
                }finally{
                    setLoading(false)
                }
            }
            fetchSingleJobs()
        },[jobId, dispatch, user?._id])


    if (!singleJob) {
        return <div>Loading...</div>;
    }
    

  return (
    <div>
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1>{singleJob?.title}</h1>
                    <div className='flex gap-2 items-center mt-4'> 
                        <Badge className='text-blue-600 font-bold' variant='ghost'>
                            {singleJob?.position} Position   
                        </Badge>
                        <Badge className='text-[#FA4F09] font-bold' variant='ghost'>
                            {singleJob?.salary}LPA
                        </Badge>
                        <Badge className='text-[#6B3AC2] font-bold' variant='ghost'>
                            {singleJob?.location}
                        </Badge>
                        <Badge className='text-black font-bold' variant='ghost'>
                            {singleJob?.jobType}
                        </Badge>
                    </div>
                </div>
                <div>
                    <Button   onClick={isApplied ? null : applyJobHandler}   disabled={isApplied} className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#6B3AC2] hover:bg-[#4f3182]"}`}>
                        {isApplied ? "Already Applied" : "Apply"}
                    </Button>
                </div>
            </div> 
            <h1 className='border-b-2 border-b-gray-400 font-medium py-4'>
                {singleJob?.description}
            </h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>
                    Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.position}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length} </span>
                </h1>
                <h1 className='font-bold my-1'>
                    Job Type: <span className='pl-4 font-normal text-gray-800'>{singleJob?.jobType}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Post Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt}</span>
                </h1>
            </div> 
        </div>  
    </div>
  )
}

export default Description