import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useApi from "../../utils/api"
import { ExtractText, TimeFormat } from "../../utils"
import { PostTypes } from "../Home/HomeMain"

const UserPosts = ({ name }: { name: string }) => {
    const api = useApi()
    const navigate = useNavigate()
    const [userPosts, setUserPosts] = useState<PostTypes[]>([])
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    useEffect(() => {
        getUserPosts()
    }, [])
    const getUserPosts = async () => {
        try {
            const response = await api.userPosts(name ? name : "")
            setUserPosts(response.data)
        } catch (error) {
            console.log("Error fetching user posts", error)
        }
    }

    const onDelete = (e:any, slug:string) => {
        e.preventDefault()
        api.deletePost(slug).then((response) => {
            console.log(response.data)
            navigate('/')
        }).catch((error) => console.log(error))
    }
    return (
        <div className="flex flex-col gap-4 border border-blue-600 shadow-lg rounded-md p-4">
            {userPosts.length !== 0 ?
                <>
                    {
                        userPosts.map((post, i) => (
                            <div className="border-b-2 pb-3 flex flex-col gap-4" key={i}>
                                <div className='flex gap-4 '>
                                    <button className="text-blue-600 cursor-pointer hover:underline text-sm" onClick={()=>navigate(`/post/${post.slug}/edit/`)}>Edit</button>
                                    <button onClick={(e:any)=>onDelete(e, post.slug)} className="text-red-600 cursor-pointer hover:underline text-sm">Delete</button>
                                </div>
                                <Link to={`/post/${post.slug}/`} className="text-xl font-semibold hover:text-blue-600">{post.title}</Link>
                                <p>
                                    {ExtractText(post?.description).slice(0, 200)}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post?.tag?.split(",")?.map((tag, i) => (
                                        <Link key={i} to={`/search/${tag.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white">#{tag}</Link>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    <Link to={`/profile/saad`} className="text-blue-600 cursor-pointer hover:underline">{post.username}</Link> <span className="text-sm">{TimeFormat(post.updated)}</span>
                                </div>
                            </div>
                        ))
                    }
                </>
                :
                <>
                    <strong className="text-center">No Post Yet</strong>
                </>
            }
        </div>
    )
}

export default UserPosts