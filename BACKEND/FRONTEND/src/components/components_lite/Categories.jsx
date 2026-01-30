import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../../redux/jobSlice'
import { useDispatch } from 'react-redux'




const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Cybersecurity Engineer",
    "Product Manager",
    "UI/UX Designer",
    "Graphic Engineer",
    "Graphics Designer",
    "Video Editor"
]

const Categories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchjobHandler=(query)=>{
            dispatch(setSearchedQuery(query))
            navigate("/browse")
        }
  return (
    <div>
        <h1 className='text-2xl font-bold text-center'>Categories</h1>
        <p className='text-center text-gray-600'>
            Explore our extensive job market.
        </p>
        <Carousel className="w-full max-w-xl mx-auto my-10">
            <CarouselContent>
                {Category.map((category,index)=>{
                    return (
                        <CarouselItem className="md:basis-1/2 lg-basics-1/3" key={index}>
                            <Button onClick={()=>searchjobHandler(category)}>{category}</Button>
                        </CarouselItem>
                    )
                })}
                
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  )
}

export default Categories