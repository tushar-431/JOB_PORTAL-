import React, { useState } from 'react'
import { HiBuildingOffice2 } from "react-icons/hi2";
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../../redux/jobSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchjobHandler=()=>{
        console.log("query",query)
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
  return (
    <div>
        <div className   ='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='px-4 mx-auto flex justify-center items-center gap-2 py-2 rounded-full bg-gray-200 text-red-600 font-medium'>
                   <span className='text-[#614232]'><HiBuildingOffice2 /></span> No.1 Job Hunt Website
                </span>

                <h2 className='text-5xl font-bold'>
                    Search Apply & <br />
                    Get Your <span className='text-[#6A38C2]'>Dream Job</span>
                </h2>
                <p>
                    Start your hunt for the best, life-changing career opportunities 
                    from here in your <br />
                     selected areas conveniently and get hired quickly.
                </p>
                <div className='flex w-[40%] shadow-lg border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input type="text" placeholder="Find Your Dream Job" onChange={(e)=>setQuery(e.target.value )} className='outline-none border-none w-full' />
                    <Button onClick={searchjobHandler} className="rounded-r-full">
                        <Search className='h-5 w-5' query={query} />
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header