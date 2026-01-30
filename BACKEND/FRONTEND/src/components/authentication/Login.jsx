import React, { useEffect, useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/data'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, user} = useSelector(store => store.auth)

    const [input, setInput]= useState({
      email:'',
      password:'',
      role:'',
    })
  
    const changeEventHandler =(e)=>{
      setInput({...input,[e.target.name]: e.target.value})
    }
  
    const changefileHandler = (e) =>{
      setInput({...input, file:e.target.files ?.[0] })
    }
  
    const submitHandler =async (e) => {
       e.preventDefault()
       const formData = new FormData()
      formData.append("email", input.email)
      formData.append("password", input.password)
      formData.append("role", input.role)
      try {
        dispatch(setLoading(true))
        const res = await axios.post(`${USER_API_ENDPOINT}/login`,formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        })
        if(res.data.success){
          dispatch(setUser(res.data.user))
          navigate("/")
          toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error )
        const errorMessage = error.response ? error.response.data.message : "An unexpected error occured."
        toast.error(errorMessage)
      }
      finally{
        dispatch(setLoading(false))
      }
    }

    useEffect(()=>{
      if(user){
        navigate('/')
      }
    },[])

  return (
    <div>
        <Navbar />
         
         <div className='flex items-center justify-center max-w-7xl mx-auto'>
          <form action="" onSubmit={submitHandler} className='w-1/2 border border-gray-500 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5 text-center text-blue-600 '><span className='underline-offset-2'>Login</span></h1>
            
            <div className='my-2'>
              <Label>Email</Label>
              <Input type='email' value={input.email} name="email" onChange={changeEventHandler} placeholder="johndoe@gmail.com"></Input>
            </div>
            <div className='my-2'>
              <Label>Password</Label>
              <Input type='password' value={input.password} name="password" onChange={changeEventHandler} placeholder="**********"></Input>
            </div>
            
            <div className='flex items-center justify-between'>
              
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className='flex items-center space-x-2'>
                  <Input type="radio" name="role" value="Student" checked = {input.role === 'Student'} onChange={changeEventHandler} className="cursor-pointer"></Input>
                    <Label htmlFor='r1'>Student</Label>
                  
                </div>
                <div className='flex items-center space-x-2'>
                  <Input type="radio" name="role" value="Recruiter" checked = {input.role === 'Recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                  <Label htmlFor='r2'>Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            { loading ? (
              <Button className={"w-full my-4"}>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>
                  Please wait
              </Button>
            ) :
            (
              <button className='block w-full py-3 my-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md cursor-pointer'>
                Login
              </button>
            )
            }

            {/* already account then login */}
            <p className='text-gray-500 text-md my-2'>
              Register an account? <Link to="/register" className='text-blue-700 cursor-pointer'>Register</Link>
            </p>
          </form>

         </div>
    </div>
  )
}

export default Login