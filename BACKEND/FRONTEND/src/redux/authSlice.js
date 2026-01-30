import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers :{
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

// export the actions
export const { setLoading, setUser} = authSlice.actions

// export the reducer
export default authSlice.reducer

// export the authSlice if needed
export const authSliceReducer = authSlice.reducer