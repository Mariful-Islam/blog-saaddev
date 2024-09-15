import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import useApi from "../../utils/api"
import { TimeFormat } from "../../utils"
import { PostTypes } from "../Home/HomeMain"
import { AuthContext } from "../../context/AuthContext"
import Cookies from "js-cookie"

const UserPosts = ({ name }: { name: string }) => {
    const api = useApi()
    const navigate = useNavigate()
    const [userPosts, setUserPosts] = useState<PostTypes[]>([])
    const {authenticated} = useContext<any>(AuthContext)
    const username:any = Cookies.get('username')
    
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
                                {authenticated && username === post.username && (
                                <div className='flex gap-4 justify-end'>
                                    <button className="text-blue-600 cursor-pointer hover:underline text-sm" onClick={()=>navigate(`/post/${post.slug}/edit/`)}>Edit</button>
                                    <button onClick={(e:any)=>onDelete(e, post.slug)} className="text-red-600 cursor-pointer hover:underline text-sm">Delete</button>
                                </div>)}
                                <Link to={`/post/${post.slug}/`} className="text-xl font-semibold text-black hover:text-blue-600 no-underline hover:underline ">{post.title}</Link>
                                <div className="flex justify-between">
                                    {/* <Link to={`/profile/saad`} className="text-blue-600 cursor-pointer hover:underline">{post.username}</Link>  */}
                                    <span className="text-sm text-gray-500">{TimeFormat(post.updated)}</span>
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