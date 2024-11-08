import { useParams } from 'react-router-dom'

function Category() {
  const { name } = useParams()

  return (
    <div>
      {name}
    </div>
  )
}

export default Category