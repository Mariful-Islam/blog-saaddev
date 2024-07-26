import { useContext, useState } from "react"
import { QuillEditor, Select } from "../../utils"
import useApi from "../../utils/api"
import { PostsContext } from "../../context/postsContext"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const PostCreateMain = () => {
    const [content, setContent] = useState("")
    const [tags, setTags] = useState<any[]>([])
    const [response, setResponse] = useState("")
    const api = useApi()
    const { getPosts }: any = useContext(PostsContext)
    const navigate = useNavigate()
    const name = Cookies.get("name") || Cookies.get("username")

    const createPost = async (e: any) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("user", name ? name : e.target.email.value.split('@')[0])
        formData.append("title", e.target.title.value)
        formData.append("content", content)
        formData.append("tag", tags.toString())

        if (content && tags && e.target.title.value) {
            await api.createPost(formData).then((response) => {
                console.log(response)
                if (response) {
                    setResponse(response.data)
                }
            }).catch((error) => console.log(error))
            setContent("")
            setTags([])
            e.target.reset()
            getPosts()
            navigate('/')
        } else {
            console.log("Form is empty ")
            alert("Form is empty")
        }
    }


    return (
        <div className="px-4 md:px-[10%]">
            <form className="pt-10 " onSubmit={createPost}>
                {response.length === 0 ?
                    <>
                        {!name ?
                            <input type="email" name="email" placeholder="Email" className="border-gray-300 w-full rounded-md mb-4" required />
                            :
                            <></>
                        }
                        <input type="text" name="title" placeholder="Title" className="border-gray-300 w-full rounded-md mb-4" required />
                        <QuillEditor value={content} onChange={setContent} className="rounded-md mb-4" />
                        <Select tags={tags} setTags={setTags}/><br />
                        <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg text-white text-md rounded-md float-right hover:bg-blue-700">Post</button>
                    </> :
                    <div>
                        {response}
                    </div>
                }
            </form>
        </div>
    )
}

export default PostCreateMain