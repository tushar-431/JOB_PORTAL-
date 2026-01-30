import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '../../utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../../redux/jobSlice'
import { useState } from 'react'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {searchQuery} = useSelector((store)=> store.job)
    
  useEffect(()=>{
    // fetch all the jobs from the api
    const fetchAllJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            
            const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, {withCredentials: true})
            
            
            if (res.data.success){
                dispatch(setAllJobs(res.data.jobs))
            }else {
            setError("Failed to fetch jobs.");
            }
            
        } catch (error) {
            console.error(error)
        }finally {
            setLoading(false);
        }
    };
    fetchAllJobs(loading, error);
  },[])
}

export default useGetAllJobs