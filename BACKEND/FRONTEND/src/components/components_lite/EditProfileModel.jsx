import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_ENDPOINT } from '../../utils/data'
import { toast } from 'sonner'
import { setUser } from '../../redux/authSlice'
import axios from 'axios';
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

const EditProfileModel = ({open, setOpen}) => {
    const [loading, setLoading] = useState(false)
    

    const {user} = useSelector((store)=> store.auth)
    const [input, setInput] = useState({
        name: user?.fullname,
        email: user?.email,
        phone: user?.phonenumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map((skills)=>skills),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch()

    const handleFileChange = async(e) => {
           e.preventDefault()
            const formData = new FormData()
            formData.append("fullname", input.name)
            formData.append("email", input.email)
            formData.append("phonenumber", input.phone)
            formData.append("bio", input.bio)
            formData.append("skills", input.skills)
            if(input.file){
            formData.append("file", input.file)
            }
            //  for (const [key, value] of formData.entries()) {
            //   console.log('formData:- ',`${key}: ${value}`);
            // }
            try {
                setLoading(true)
            
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`,formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }
            )
            if(res.data.success){
                dispatch (setUser(res.data.user))
                toast.success(res.data.message)
            }
            
            } catch (error) {
            console.log(error )
            const errorMessage = error.response ? error.response.data.message : "An unexpected error occured."
            toast.error("Failed to upload profile")
            }
            finally{
                setLoading(false)
            }
            setOpen(false)
           console.log(input)
    }

    const fileChangeHandler = (e) =>{
        const file = e.target.files?.[0]
        setInput({...input,file})
    }

  return (
    <div>
        <Dialog open={open}>
            <DialogContent className={"sm:max-w-[500px]"} onInteractOutside={()=>setOpen(false)} >
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                {/* Form for editing profile */}
                <form onSubmit={handleFileChange}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor='name' className={"text-right"}>
                                Name
                            </Label>
                            <input type="text" id='name' name='name' value={input.name} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor='email' className={"text-right"}>
                                Email
                            </Label>
                            <input type="email" id='email' name='email' value={input.email} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor='phone' className={"text-right"}>
                                Phone Number
                            </Label>
                            <input type="tel" id='phone' name='phone' value={input.phone} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor='bio' className={"text-right"}>
                                Bio
                            </Label>
                            <input type="bio" id='bio' name='bio' value={input.bio} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor='skills' className={"text-right"}>
                                Skills
                            </Label>
                            <input type="text" id='skills' name='skills' value={input.skills} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                        
                        {/* Resume file upload */}
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor='resume' className={"text-right"}>
                                Resume
                            </Label>
                            <input type="file" id='resume' name='resume' accept='application/pdf' onChange={fileChangeHandler}  className='col-span-3 border border-gray-300 rounded-md p-2' />
                        </div>
                    </div>
                    { loading ? (
                        <Button className={"w-full my-4"}>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>
                            Please wait
                        </Button>
                        ) :
                        (
                        <button type='submit' className='block w-full py-3 my-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md cursor-pointer'>
                            Save
                        </button>
                        )
                    }
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default EditProfileModel