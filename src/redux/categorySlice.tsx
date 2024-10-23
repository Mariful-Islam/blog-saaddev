import { createSlice } from "@reduxjs/toolkit";
import useApi from "../utils/api";


interface Categories{
    results: any[];
    isLoaded: boolean;
}

const initialState: Categories = {
    results: [],
    isLoaded: false
}


const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.results = action.payload
            state.isLoaded = true
        }
    }
})


export const { setCategory } = categorySlice.actions 

export const fetchCategory = () => async (dispatch:any) => {
    const api = useApi()
    try {
        const response:any = await api.getCategories()
        dispatch(setCategory(response?.data[0]?.category))
    }catch{
        console.log('Error fetch category.')
    }
}


export default categorySlice.reducer