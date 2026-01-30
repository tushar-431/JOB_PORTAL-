import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = ({inputt}) => {
   
    const navigate = useNavigate()
    const { companies }  = useSelector((store)=> store.company)
    const [filterCompany, setFilterCompany] = useState(companies)
    console.log(inputt)
    useEffect(()=>{
        const filteredCompany = companies.length>0 && companies.filter((company)=>{
            if(!inputt){
                return true
            }
            return company.name?.toLowerCase().includes(inputt.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    },[inputt, companies])
  return (
    <div>
        <div>
            <Table>
                  <TableCaption>Your recent registed companies</TableCaption>
                  <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={"text-right"}>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  
                    {filterCompany && filterCompany.length > 0 ? (
                        <>
                            {filterCompany?.map((company, index)=>{
                                
                            return (
                                <TableBody key={index}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage alt={`${company.name}`} src={company.logo || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACUCAMAAADBJsndAAAAWlBMVEXl5eX///9gYGDp6eldXV1aWlr7+/vt7e329vbx8fGsrKzg4OCPj49TU1PZ2dlXV1dNTU2jo6O3t7fS0tLAwMBubm52dnZnZ2fKysqYmJiCgoKIiIhISEh8fHzw4Dw1AAAG90lEQVR4nO2c65ayOgyG2ZSKFgE5Cvp5/7e5k4KKMz1CaZdrzftnxsgMj0kaCqaN/vsORaEBDPXH6VZ/nG7lnvOAcv5fXXEeDsfj6XRK05Sg4Ce8Oh6dETvhPBwRL/otBD46Qd3MCYwCwE85YN3GeTilIjcKHJuetqFu4TyczCBn1E2kqzntIDejruRcQ7mJdBXnWsoNpGs4j+spOenRC6dBHdIptSe15TycNlOirINvybkx5G/ZBt+K05EzJ9m51IbzsD0zl0ptQC04ncX8KZvYm3M6x7QCNeZ0mZpvnVxz7oNpDmrIuRemMagZ536YpqBGnHtiGoKacO6LaQZqwHncGTOKDMqTnnOHuvlTBnVUy3nYHxNAtZdQHafja7pM2mu9jnPvMfSUbixpOD0k5yRdiqo5vSTnDKqOvJrTV9RR6sgrOfevnEspI6/i9Bh1lDLyKk6fUUepIq/g9OxOtUMVnH4q/FLpGs6Dd8wokjtUzuk7O1HyDJVyes9OlDxDpZwh3KlwqIwziDsVDpVxhnGn3KEyzjDuBIfacYYoSpMkgZdwhgq7NPBizkCjCCUZSWJOvxO6T4mnd2LOcGGXBV7M6X8K8pZ4MiLkDJiesgQVcoYMuyTwX80ZMuySS5KQMyhmJEYS2MJdNCeJBpKIU1PlsZnmtw17bX7mC8Gum58dLpNR1a8hqvQiTs0wGljFso8zR0Vd3c9nNmQLJkKygZ3P97FuIrI0VmCs6iKSkooGkohTXeWze0lLtjiGNGNcJklCadmx7Hl2UrCe0oTbb/X8uUhW9yVaKaXnQQYqqvQiTvVwz85JTBecaX0twQKK46S8zW4ixY0mMTcDVdzOxjschZDwVtm1EoeIBryAU3M1+sFJaqBMrg8I5hXP/pisQw9ASXcDcw+/VNxaPMo4jjtIkR5+JjP9b07BQNrKSZoHYPZ1k0VFe4ezU4Z/nt0AMx6HIsuypr7HE2cFLgcj2tgVDr0V/jgZOmbA8UOAGehuBYFcyIGoyiZzlLGBf6QuifMRDYSQCo64tsJTGXJqniF/cmboznF+RWpMARgfpEPruyjwKkRYGSfdPNAIgSwpK7E/BYVJxKnE/OQkAyblc+Ryj8UMrODkrvnxecmdxuX4qgdjGdN7Fom0A2eNRK80Iz34sSIpo8jAgz4L30Un1y9OSI2kFyeoe860gljeXl4hd0A5Q/LRKaaEVZMafBfA3hlJWjg09scJJ39Hj8B78ZlEI41zOIQU17xE5RXi/QPXv0oRaSES1/CcZcU5ATLBoR8JOf35k33EPb0BVMU56YgGjHv/5LwsKxFp6TKzd+dMPs7W43jn44jX0QhKOvcx5wT/JezFyXIo9JvGu0X9JO1nXcJXLcGYvlyXPjnJA7Ph+c9TXqWEZzCsn1bXo2JZ56OxnPzI6zx36JITa8O1mOt882/r9ciI8/Qsi2PCqw1/UXfJdH3HcgXjq8D6+eaE6g8uzPix+Pno/En240zGgasgZEDX9awpioYhZsfPncF0KaYPNjRN2z/zMzvj1A8mJ0XR4oCjtfhMhpy6eTL6h164sEYyHB5l3PVxDpjXgf81n5LESQ5jJX/VJdIgfUm7vstx1jcKe+7N58kGnJMwTUnEYgxykuA0+fHKuAanxJOSkrLJ2D6wmvJjy2slLkrmnJr7oyq/PDUFrh3pJQddOrY4dVbfuTW/xOf2aS9YNxmTcyO9QTK9PzK435z1nKORpq7rNvu8iSQpGbiZLOwkzVowNkRxw2l6v7niOQNJhSs8RGa+SEU5VIVIbjidypgz5ONPyQPQr35eF/LxvOQBvfi5d9DnyUKir34+/zXfy3zL91wBAy/pEZFwhgu8pNtK9n1xsO+17b4vDhZ4WWuQjDNU4GVNdtI+ljAOlXZafXu/ja/G5E/J25Tl/WAhMlTeAqroA/RfmmTNNmpO/xmqaABV9an6zlBFW6WS03eGqhqUlX3Ufh2qcqea0+tVXt1Ar+6f9xl59YIEzboJf5FXRl3L6S3yupU9uvUyviKvWymlXSflp9prl8jp1535SFFNchpxekhR/bIzk/WGu4MaYBqt39wZ1ATTbD3srqvPzBaXm60v3hHUcA284Xrt3UBNl+qbrn/fKUeNctOGcx9QY0yL/Rl2uAG12PHCZl8O15dQ480ZLDndjia7HVns9o1xGHurXU6s97fZsvPSUta7MFnva+TEpZbOXMPpIEvXbBS1Zj+rjdsGrdp4a90+ZhtIV25ktnZfuHUDav3GcOv32bMn3bLT3qZ9C48WqOS0Zps1N5y4C+RJ0jTzwQiQG3eC3Mg5oSrbKEi6GdIJJxeH/blAgrhB5HLEyTXvqTrJ4V6qKJece+qP063+ON3qj9Ot/jjd6ls4/wdu72bEf7gi/wAAAABJRU5ErkJggg=='}></AvatarImage>

                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className={"text-right "}>
                                        <Popover className="cursor-pointer">
                                            <PopoverTrigger className="cursor-pointer" >
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className={"w-32"}>
                                                <div 
                                                onClick={()=>navigate(`/admin/companies/${company._id}`)}
                                                className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableBody>
                            )
                        })}
                        </>
                        
                    ) : (
                        <TableBody>
                            <span>No Companies Added</span>
                        </TableBody>
                    )}
                  
            </Table>
        </div>
    </div>
  )
}

export default CompaniesTable