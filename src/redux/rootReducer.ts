import { combineReducers } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'

const rootReducers = combineReducers({
    categories: categoryReducer,
})


export type RootState = ReturnType<typeof rootReducers>
export default rootReducers