import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String
    },
    logo:{  //url for logo
        type:String,
    },
    
   
},{timestamps:true})

export const Company = mongoose.model("Company", companySchema)