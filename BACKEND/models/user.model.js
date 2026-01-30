import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:[ "Student", "Recruiter"],
        default: "Student",
        required:true,
    },
    profile:{
        bio:{
            type:String, 
        },
        skills:[{
            type:String
        }],
        resume:{ //URL of resume file
            type:String
        },
        resumeOriginalname:{ //Original name of resume file
            type:String,
        },
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Company"
        },
        profilePhoto:{
            type:String,
            default:""
        },

    },
    createdAt:{
        type: Date,
        default: Date.now 
        },

},{timestamps:true})

export const User = mongoose.model("User", userSchema)