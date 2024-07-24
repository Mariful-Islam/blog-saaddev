import { useEffect, useState } from "react"
import useApi from "../../utils/api"
import { TimeFormat } from "../../utils";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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
    const [open, setOpen] = useState<boolean>(false)
    const name = Cookies.get("name") || Cookies.get("username")
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
    const handleComment = async (e: any) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user', name ? name : e.target.email.value.split('@')[0])
        formData.append('text', e.target.comment.value)
        try {
            const response = await api.createComment(formData)
            if (response.data) {
                console.log("Successfully comment")
            }
            e.target.reset()
            getComments()
        } catch (error) {
            console.log("Error in comment", error)
        }
    }
    const handleEdit = async (e: any, comment_id?: any, user?: any) => {
        e.preventDefault()
        console.log(e.type)
        if (e.type === "submit") {
            const formData = new FormData()
            formData.append("post", id)
            formData.append('user', user)
            formData.append('text', e.target.edit_comment.value)

            try {
                await api.editComment(comment_id, formData)
                getComments()
                setOpen(false)
            } catch (error) {
                console.log(error)
            }
        } else {
            setOpen(!open)
        }
    }
    const handleDelete = async (e: any, id: number) => {
        e.preventDefault()
        try {
            await api.deleteComment(id)
            getComments()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className="flex flex-col gap-6 mt-8">
                <strong className="text-2xl">Comments</strong>
                <div className="flex flex-col gap-6">
                    {comments?.map((comment, i) => (
                        <div className="flex flex-col gap-0" key={i}>
                            <div className="flex justify-between items-centers">
                                <Link to={`/profile/${comment.user}`} className="font-semibold hover:text-blue-600 hover:underline cursor-pointer">{comment?.user}</Link> <span className="text-[12px] text-gray-500">{TimeFormat(comment?.updated)}</span>
                            </div>
                            <div>

                                {open ? (
                                    <form onSubmit={(e) => handleEdit(e, comment.id, comment.user)}>
                                        <input type="text" name="edit_comment" className="border-gray-300 my-2 rounded-md" defaultValue={comment.text} />

                                        <input type="submit" className="px-6 py-2 bg-blue-600 text-white text-md rounded-md float-right hover:bg-blue-700" value="Update" />
                                        <button onClick={handleEdit} className="px-6 py-2 bg-red-100 text-red-600 text-md rounded-md float-right hover:bg-red-200 mr-3" value="Cancel">Cancel</button>
                                    </form>) : (
                                    <p className="text-gray-500 pl-2 my-1">{comment.text}</p>
                                )}
                            </div>
                            <div className="flex gap-2 text-sm text-gray-400">
                                <span onClick={handleEdit} className="text-blue-600 cursor-pointer hover:underline">Edit</span>
                                <span onClick={(e) => handleDelete(e, comment.id)} className="text-red-600 cursor-pointer hover:underline">Delete</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-10 flex flex-col gap-6">
                <strong>Write Comment</strong>
                <form className="" onSubmit={handleComment}>
                    {!name ?
                        <input type="email" name="email" placeholder="Email" className="border-gray-300 w-full rounded-md mb-4" required />
                        :
                        <></>
                    }

                    <input type="text" name="comment" placeholder="Write your comment..." className="w-full border-gray-300 rounded-md mb-4" required />
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-md rounded-md float-right hover:bg-blue-700">Comment</button>
                </form>

            </div>
        </div>
    )
}

export default Comment