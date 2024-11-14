import { useParams } from 'react-router-dom'
import { CategoryPath } from '../components/categoryPath'
import Posts from '../components/Home/Posts'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'

function Category() {
  const { name } = useParams()
  const {results} = useSelector((state: RootState)=>state.categories)

  return (
    <div className='px-4 md:px-[10%] py-10'>
      <CategoryPath category={name || ''}/>
      <Posts data/>
    </div>
  )
}

export default Category