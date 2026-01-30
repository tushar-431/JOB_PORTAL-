import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';

const filterData = [
  {
    filterType: "",
    array:[
      "All"
    ]
  },
  {
    filterType: "Location",
    array:[
      "Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Remote"
    ]
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },{
    filterType: "Experience",
    array:["0-3 years", "3-5 years", "5-7 years", "7+ years"]
  },
  {
    filterType: "Salary",
     array: ["0-50k", "50k-100k", "100k-200k", "200k+"]
  }
];

const FilterCard = () => {
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState()
  const handleChange = (value)=>{
    setSelectedValue(value)
  }

  useEffect(()=>{
    if (selectedValue==='All'){
      setSelectedValue('')
    }
    dispatch(setSearchedQuery(selectedValue))
    
  },[selectedValue])

  
      useEffect(()=>{
            dispatch(setSearchedQuery(''))
            // useGetAllJobs()
          
        },[])


  return (
    <div className='w-full bg-white rounded-md'>
      <h1>Filter Jobs</h1>
       <hr />
       <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className='font-bold text-lg'>{data.filterType}</h2>
            
            {data.array.map((item, idx)=>{
              const itemId = `Id${index}=${idx}`;
              return (
                <div key={idx} className='flex items-center space-x-2 '>
                  <RadioGroupItem value={item} id={itemId}>
                  </RadioGroupItem>
                  <label htmlFor={itemId}>{item}</label>
                  
                </div>
              )
              })}
            
          </div>
        )
        )}
       </RadioGroup>
    </div>
  )
}

export default FilterCard