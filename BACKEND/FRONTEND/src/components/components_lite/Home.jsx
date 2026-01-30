import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Categories from './Categories'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setSearchedQuery } from '../../redux/jobSlice'

const Home = () => {
  const {user} = useSelector((store)=>store.auth)
  const {allJobs} = useSelector((store)=>store.job)

  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role === "Recruiter"){
      navigate("/admin/companies")
    }
  },[])


  useGetAllJobs()
  // const dispatch = useDispatch()
  // dispatch(setSearchedQuery(""))

  useEffect(()=>{
    const dispatch= useDispatch()
    dispatch(setSearchedQuery(""))
  },[])
  
  return (
    <div>
        <Navbar />
        <Header />
        <Categories />
        <LatestJobs />
        <Footer />
    </div>
  )
}

export default Home
