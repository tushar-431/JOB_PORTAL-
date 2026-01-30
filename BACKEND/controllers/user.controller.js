import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloud.js"

export const register = async (req,res) =>{
    try {
        const { fullname, email, phonenumber, password,role} = req.body
      
        if(!fullname || !email || !phonenumber || !password || !role){
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            })
        }

        const file = req.file
        const fileuri = getDataUri(file)
        const cloudinaryResponse = await cloudinary.uploader.upload(fileuri.content)

        const user = await User.findOne({email})
        if (user){
            return res.status(404).json({
                message: "Email already exists",
                success: false,
            })
        }
        const phone_number = await User.findOne({phonenumber})
        if (phone_number){
            return res.status(404).json({
                message: "Phone Number already exists",
                success: false,
            })
        }
        //convert password to hashes
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            fullname,
            email,
            password:hashedPassword,
            phonenumber,
            role,
            profile:{
                profilePhoto: cloudinaryResponse.secure_url,
            }
        })

        await newUser.save()

        return res.status(200).json({
            message: `Account created successfully ${fullname}`,
            newUser,
            success:true
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
                message: "Server error register",
                success: false,
            })
    }
}

export const login = async (req,res) => {
    try {
        const {email, password, role} = req.body
        if(!email || !password || !role){
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            })
        }
        
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        //check role correctly or not
        if(user.role !== role){
            return res.status(403).json({
                message: "You don't have the necessary role to acces this resourse",
                success: false,
            })
        }

        // generate token
        const tokenData = {
            userId : user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET,{
            expiresIn:"1d",
        })

        user = {
            _id:user._id,
            fullname:user.fullname,
            email: user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1*24*60*60*1000, 
            httpOnly:true,
            sameSite:"Strict"
            }).json({
                message: `Welcome back ${user.fullname}`,
                user,
                success:true
            })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
                message: "Server error login",
                success: false,
            })
    }
}

export const logout = (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAage:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
                message: "Server error logout",
                success: false,
            })
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {fullname, email, phonenumber, bio, skills}= req.body

          const file = req.file
            //  cloudinary upload
            const fileuri = getDataUri(file)
            const cloudinaryResponse = await cloudinary.uploader.upload(fileuri.content)

        
        
        const userId = req.id  //middleware authentication
        let user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false,
            })
        }

        //update database profile
        if (fullname){
            user.fullname = fullname
        }
        if(email){
            user.email = email
        }
        if (phonenumber){
            user.phonenumber = phonenumber
        }
        if (bio){
            user.profile.bio = bio
        }

       if (skills) user.profile.skills = skills.split(" ") || skills.split(", ");
        
        
        //resume
        if(cloudinaryResponse){
        user.profile.resume = cloudinaryResponse.secure_url
        user.profile.resumeOriginalname = file.originalname
        }


        await user.save()

        user = {
            _id:user._id,
            fullname:user.fullname,
            email: user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
                message: "Server error updating profile",
                success: false,
                
            })
    }
}