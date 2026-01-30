import React from 'react'
import JobCards from './JobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const randomJobs = [1,2,3,4,5,6,7,8,9]

const LatestJobs = () => {
    const navigate = useNavigate()
    const { allJobs } = useSelector((store) => store.job)
  return (
    
        <div className='max-w-7xl m-auto my-20'>
            <h2 className='text-4xl font-bold'>
                <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
            </h2>
            {/* Job Cards */}

            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  gap-4 my-5'>
                { allJobs && allJobs.length !== 0 ? (allJobs.slice(0,6).map((job, index)=>(
                    <JobCards  key={job._id} job={job} />
                ))) : (<span>No Job Available</span>) }
            </div>
        </div>
        
    
  )
}

export default LatestJobs