import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '../../utils/data'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {

    const {companies} = useSelector((store)=>store.company)
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title:"",
        description:"",
        location:"",
        salary: "",
        companyId: "",
        position: 0,
        requirements: "",
        experience:"",
        jobType:""
    })
    const changeEventHandler = (e)=>{
        setInput({...input, [e.target.name]:e.target.value })
    }

    const selectChangeHandler = (value) =>{
        console.log("first")
        const selectedCompany = companies.find(
            (company)=> company.name.toLowerCase() === value
        )
        setInput({...input, companyId: selectedCompany._id})
    }  

    const submitHandler=async(e)=>{
        e.preventDefault()
        console.log(input)
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input,
                {
                    headers:{
                        "Content-Type": "application/json"
                    },
                    "withCredentials": true
                }
            );
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false)
        }
    }
    
  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-center w-screen my-5'>
            <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-500 shadow-sm hover:shadow-xl hover:shadow-red-300 rounded-lg'>
                <div className=' grid grid-cols-2 gap-5'>
                    <div>
                        <Label>Title</Label>
                        <Input type={"text"} name="title" value={input.title} onChange={changeEventHandler} placeholder="Enter job title" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"}></Input>
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input  name="description" value={input.description} onChange={changeEventHandler} placeholder="Enter job description" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"} />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input type={"text"} name="location" value={input.location} onChange={changeEventHandler} placeholder="Enter job location" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"}></Input>
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input type={"number"} name="salary" value={input.salary} onChange={changeEventHandler} placeholder="Enter job salary" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"}></Input>
                    </div>
                    <div>
                        <Label>Position</Label>
                        <Input type={"number"} name="position" value={input.position} onChange={changeEventHandler} placeholder="Enter job position" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"}></Input>
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input type={"text"} name="requirements" value={input.requirements} onChange={changeEventHandler} placeholder="Enter job requirements" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"}></Input>
                    </div>
                    
                    <div>
                        <Label>Experience</Label>
                        <Input type={"number"} name="experience" value={input.experience} onChange={changeEventHandler} placeholder="Enter job experience" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"}></Input>
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input type={"text"} name="jobType" value={input.jobType} onChange={changeEventHandler} placeholder="Enter job jobType" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"}></Input>
                    </div>

                    <div >
                        {companies.length > 0 && (
                            <Select onValueChange={selectChangeHandler} >
                                <SelectTrigger className={"w-full hover:shadow-blue-400 cursor-pointer"}>
                                    <SelectValue placeholder='Select a Company' ></SelectValue>
                                </SelectTrigger>
                                <SelectContent className='hover:shadow-blue-400'>
                                    <SelectGroup >
                                        {companies.map((company, index)=>(
                                            <SelectItem key={index} value={company.name.toLowerCase()} className={"cursor-pointer"}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <div></div>
                   
                </div>

                <div>
                    { loading ? (
                        <Button className={"w-full my-4 bg-blue-500"}>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin   '></Loader2>
                            Please wait
                        </Button>
                        ) :(
                        <button type='submit' className='block w-full py-3 my-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md cursor-pointer'>
                            Post Job
                        </button>
                        )}
                </div>
                
                {companies.length ===0 && (
                    <p className='text-sm font-bold my-3 text-center text-red-600'>
                        *Please register a company to post jobs.*
                    </p>
                )}
            </form>
        </div>
    </div>
  )
}

export default PostJob