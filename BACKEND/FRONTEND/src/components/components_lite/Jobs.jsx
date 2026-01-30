import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import FilterCard from './FilterCard'
import Job1 from './Job1'
import { useDispatch, useSelector } from 'react-redux'
import {motion} from 'framer-motion'
import { setSearchedQuery } from '../../redux/jobSlice'


const Jobs = () => {
    const { allJobs, searchQuery } = useSelector((store) => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)
   

    useEffect(()=>{
        if(!searchQuery || searchQuery.trim()===""){

        if(!searchQuery || searchQuery.trim() === ""){
            setFilterJobs(allJobs)
            return
        }
        const filteredJobs = allJobs.filter((job)=>{
            const query = searchQuery.toLowerCase();
            return (
                job.title?.toLowerCase().includes(query) ||
                job.description?.toLowerCase().includes(query) ||
                job.location?.toLowerCase().includes(query) ||
                job.experience?.toLowerCase().includes(query) ||
                job.salary?.toLowerCase().includes(query) 
            );
        });
        setFilterJobs(filteredJobs)
        
        
    },[allJobs, searchQuery])

    const dispatch = useDispatch()
    useEffect(()=>{
        return () => {
          dispatch(setSearchedQuery(""))
          // useGetAllJobs()
        }
      },[])

  return (
    <div>
        <Navbar /> 

        {/* Filter card */}
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
                <div className='w-20%'>
                    <FilterCard />
                </div>
                {filterJobs.length <= 0 ? (
                    <span className=''>Job not found</span>
                ) : (
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                            {filterJobs.map((job, index)=>{
                                return (
                                    <motion.div
                                        initial={{opacity:0,x:100}}
                                        animate={{opacity:1, x:0}}
                                        exit={{opacity:0, x:-100}}
                                        transition={{duration: 0.4}}
                                        key={index}
                                    >
                                        <Job1  job={job}/>
                                    </motion.div>
                                )
                                
                            })}
                            <div></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Jobs 
