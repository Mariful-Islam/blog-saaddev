import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';
import { TimeFormat } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import useApi from '../../utils/api';

interface BlogTypes {
    id: number;
    user: string;
    title: string;
    content: string;
    tag: string;
    tag_list: string[];
    updated: string;
    created: string;
}


const PostViewMain = () => {
    const { id } = useParams()
    const api = useApi()
    const [post, setPost] = useState<BlogTypes>()
    useEffect(() => {
        getPost()
    }, [])
    const getPost = async () => {
        try {
            const response = await api.post(id ? id : '')
            setPost(response.data)
        } catch (error) {
            console.log("Error fetching post", error)
        }
    }
    const sanitizedContent = post ? DOMPurify.sanitize(post.content) : "";
    return (
        <div className="px-[12%] py-10 flex flex-col gap-10">

            <div className="flex justify-between">
                <Link to={`/profile/${post?.user}`} className='text-blue-600 font-semibold hover:underline'>{post?.user}</Link> <span className='flex flex-col text-sm items-end text-gray-600'><p>{post?.created ? TimeFormat(post?.created) : ''}</p> <p>Last updated: {post?.updated ? TimeFormat(post?.updated) : ''}</p> </span>
            </div>
            <strong className="font-bold text-3xl">{post?.title}</strong>

            <div className='text-justify' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            <div className="flex flex-wrap gap-2">
                {post?.tag_list?.map((i) => (
                    <Link to={`/search/${i.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white">#{i}</Link>
                ))}
            </div>
        </div>
    )
}

export default PostViewMain