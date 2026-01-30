import {createSlice} from "@reduxjs/toolkit"
import { all } from "axios"

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        allAppliedJobs: [],
        searchQuery: "",
    },
    reducers: {
        //actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setAllAppliedJob: (state,action)=>{
            state.allAppliedJobs=action.payload
        },
        setSearchedQuery(state,action){
            state.searchQuery=action.payload
        }
    
    }
})

export const {setAllJobs, setSingleJob, setAllAdminJobs, setAllAppliedJob, setSearchedQuery} = jobSlice.actions

export default jobSlice.reducer