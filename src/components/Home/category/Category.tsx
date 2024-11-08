import { useEffect } from 'react'
import Categories from '../../NestedCategory'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { fetchCategory } from '../../../redux/categorySlice'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function Category() {

  const dispatch = useDispatch()
  const { results, isLoaded } = useSelector((state:RootState)=>state.categories)

  useEffect(()=>{
    if (!isLoaded) {
      dispatch(fetchCategory() as any)
    }
  }, [dispatch])

  if(!isLoaded) {
    return <><Skeleton count={1} height={35}/></>
  }


  return (
    <>
      <Categories categories={results}/>
    </>
  )
}

export default Category