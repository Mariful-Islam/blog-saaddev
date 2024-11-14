import { useParams } from 'react-router-dom'
import { CategoryPath } from '../components/categoryPath'
import Posts from '../components/Home/Posts'

function Category() {
  const { name } = useParams()

  return (
    <div className='px-4 md:px-[10%] py-10'>
      <CategoryPath category={name || ''}/>
      <Posts posts={[]} isLoaded={true}/>
    </div>
  )
}

export default Category