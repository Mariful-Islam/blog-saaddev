import { useEffect, useState } from 'react'
import useApi from '../../../utils/api'
import Categories from '../../NestedCategory'
import { toast } from 'react-toastify'

function Category() {
  const api = useApi()
  const [categories, setCategories] = useState<any>()

  const fetchCategories = () => {
    api.getCategories().then((response:any)=>{
      setCategories(response.data[0].category)
    }).catch(()=>toast.error("Fetch categories error."))
  }

  useEffect(()=>{
    fetchCategories()
  },[])

  console.log(categories)
  return (
    <>
      <Categories categories={categories}/>
    </>
  )
}

export default Category