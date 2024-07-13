import { useEffect, useState } from "react"
import useApi from "../../utils/api"
import { TimeFormat } from "../../utils";
import { Link } from "react-router-dom";

export interface CommentTypes {
    id: number;
    post: number;
    user: string;
    text: string;
    created: string;
    updated: string;
    post_id: number;
    post_title: string;

}
const Comment = ({ id }: { id?: number | any }) => {
    const api = useApi()
    const [comments, setComments] = useState<CommentTypes[]>([])
    useEffect(() => {
        getComments()
    }, [])
    const getComments = async () => {
        try {
            const response = await api.comments(id)
            setComments(response.data)
        } catch (error) {
            console.log("Error fetching comments", error)
        }
    }
    const handleComment = (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user', 'saad')
        formData.append('text', e.target.comment.value)

        api.createComment(formData).then((response) => console.log(response.data)).catch((error) => console.log(error))
        e.target.reset()
        getComments()
    }
    return (
        <div>
            <div className="flex flex-col gap-10">
                <strong className="text-2xl">Comments</strong>
                <div className="flex flex-col gap-6">
                    {comments?.map((comment, i) => (
                        <div className="flex flex-col gap-1" key={i}>
                            <div className="flex justify-between items-centers">
                                <Link to={`/profile/${comment.user}`} className="font-semibold hover:text-blue-600 hover:underline cursor-pointer">{comment?.user}</Link> <span className="text-sm">{TimeFormat(comment?.updated)}</span>
                            </div>
                            <div>
                                <p className="text-gray-500 pl-2">{comment?.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-10 flex flex-col gap-6">
                <strong>Write Comment</strong>
                <form className="" onSubmit={handleComment}>
                    <input type="text" name="comment" placeholder="Write your comment..." className="w-full" /> <br /> <br />
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-md rounded-md float-right">Comment</button>
                </form>

            </div>
        </div>
    )
}

export default Comment