import { Link } from "react-router-dom"
import { CommentTypes } from "../post-view/Comment"

const UserComments = ({ userComments }: { userComments: CommentTypes[] }) => {
    return (
        <div className="flex flex-col gap-4 border border-blue-600 shadow-lg rounded-md p-4">
            {userComments.length !== 0 ?
                <>
                    {userComments.map((comment, i) => (
                        <div className="border-b pb-1" key={i}>
                            You commented <b>{comment.text}</b> on this post <Link to={`/post/${comment.post_slug}`} className="font-semibold underline">{comment.post_title}</Link>
                        </div>
                    ))}
                </>
                :
                <>
                    <strong className="text-center">No Comment Yet</strong>
                </>
            }
        </div>
    )
}

export default UserComments