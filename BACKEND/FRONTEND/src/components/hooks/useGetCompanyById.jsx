import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { COMPANY_API_ENDPOINT} from '../../utils/data'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null) 

  useEffect(()=>{
    // fetch all the jobs from the api
    const fetchSingleCompany = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {withCredentials: true})
            
            dispatch(setSingleCompany(res.data.company))
            
        } catch (error) {
            console.error("Fetch Error: ",error)
            setError(error.message || "An error occured.")
        }
        finally{
            setLoading(false)
        }
    };
    fetchSingleCompany();
  },[companyId, dispatch])
}

export default useGetCompanyById