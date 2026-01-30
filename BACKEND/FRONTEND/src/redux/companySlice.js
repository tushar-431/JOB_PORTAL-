import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        // initial state for company details
        singleCompany: {},
        companies: []
    },
    reducers: {
        // reducers for company details
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setCompanies: (state, action)=>{
            state.companies= action.payload
        }
    }
})

export const {setSingleCompany, setCompanies} = companySlice.actions

//export the reducer
export default companySlice.reducer

//export the companySlice if needed
export {companySlice} 