import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useApi from "../../utils/api"
import { ExtractText, TimeFormat } from "../../utils"
import { PostTypes } from "../Home/HomeMain"

const UserPosts = ({ name }: { name: string }) => {
    const api = useApi()
    const [userPosts, setUserPosts] = useState<PostTypes[]>([])
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
    return (
        <div className="flex flex-col gap-4 border border-blue-600 shadow-lg rounded-md p-4">
            {userPosts.length !== 0 ?
                <>
                    {
                        userPosts.map((post, i) => (
                            <div className="border-b-2 pb-3 flex flex-col gap-4" key={i}>
                                <Link to={`/post/${post.id}/`} className="text-xl font-semibold hover:text-blue-600">{post.title}</Link>
                                <p>
                                    {ExtractText(post?.description).slice(0, 200)}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post?.tag?.split(",")?.map((tag, i) => (
                                        <Link key={i} to={`/search/${tag.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white">#{tag}</Link>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    <Link to={`/profile/saad`} className="text-blue-600 cursor-pointer hover:underline">{post.user}</Link> <span className="text-sm">{TimeFormat(post.updated)}</span>
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