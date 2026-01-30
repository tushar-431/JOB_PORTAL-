import React from 'react'
import { Button } from '../ui/button'
import {  Bookmark, BookmarkCheck, BookMarked } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobSlice'

const Job1 = ({job}) => {
  const navigate = useNavigate()
  const dispath = useDispatch()

  const [isBookmarked, setIsBookmarked] = React.useState(false)

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDiff = currentTime - createdAt
    return Math.floor(timeDiff/(1000*3600*24))
  }

  // useEffect(()=>{
  //     return () => {
  //       (setSearchedQuery(""))
  //       // useGetAllJobs()
  //     }
  //   },[])

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} </p>
        <Button onClick={()=> setIsBookmarked(!isBookmarked)} variant='outline' className={"rounded-full"} size='icon'>
          {isBookmarked ? <BookmarkCheck />: <Bookmark />}
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className={"p-6"} variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src={job?.company?.logo || 'https://cdn.dribbble.com/userupload/42179759/file/original-8939a7332eb5bdc39b71ea43d0b14965.jpg?format=webp&resize=400x300&vertical=center'}></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className='text-lg font-medium'>{job?.company?.name.toUpperCase()}</h1>
          <p className='text-sm text-gray-600'>India</p>
        </div>
      </div>

      <div>
        <div>
          <h2 className='font-bold text-lg my-2'>{job?.title}</h2>
          <p className='text-sm text-gray-600'>
            {job?.description}
          </p>
        </div>
        <div className='flex gap-2 items-center mt-4'>
          <Badge className='text-blue-600 font-bold' variant='ghost'>
            {job?.position} Position
          </Badge>
          <Badge className='text-[#FA4F09] font-bold' variant='ghost'>
            {job?.salary}LPA
          </Badge>
          <Badge className='text-[#6B3AC2] font-bold' variant='ghost'>
            {job?.location}
          </Badge>
          <Badge className='text-black font-bold' variant='ghost'>
            {job?.jobType}
          </Badge>
        </div>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={()=>{navigate(`/description/${job?._id}`)}} variant='outline' className={"font-bold rounded-sm"}>
          Details
        </Button>
        <Button variant='outline' className={"bg-[#6B3AC2] text-white font-bold rounded-sm"}>
          Save For Later
        </Button>
      </div>
    </div>
  )
}

export default Job1