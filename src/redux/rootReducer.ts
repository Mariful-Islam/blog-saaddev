import { combineReducers } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import postsReducer from './postsSlice'


const rootReducers = combineReducers({
    categories: categoryReducer,
    posts: postsReducer
})


export type RootState = ReturnType<typeof rootReducers>
export default rootReducers