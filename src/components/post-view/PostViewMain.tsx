import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';
import { DropdownMenu, TimeFormat } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import useApi from '../../utils/api';
import Comment from './Comment';
import { MenuItemProps } from '../../utils/types';

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

const postOption: MenuItemProps[] = [
    {
        type: "button",
        label: "Edit",
        onClick: () => console.log("edir")
    },

    {
        type: "button",
        label: "Delete",
        onClick: () => console.log("delete")
    }
]

const PostViewMain = () => {
    const { id } = useParams()
    const api = useApi()
    const [post, setPost] = useState<BlogTypes>()
    useEffect(() => {
        getPost()
    }, [])
    const getPost = () => {
        api.post(id ? id : '').then((response) => setPost(response.data)).catch((error) => console.log(error))
    }
    const sanitizedContent = post ? DOMPurify.sanitize(post.content) : "";
    return (
        <div className="px-[12%] py-10 flex flex-col gap-10">

            <div className="flex justify-between">
                <Link to={`/profile/${post?.user}`} className='text-blue-600 font-semibold hover:underline'>{post?.user}</Link>
                <DropdownMenu buttonText='' menuItems={postOption} className='' menuStyle='three_dot' />
            </div>
            <span className='flex flex-col text-sm items-end text-gray-600'>
                <p>{post?.created ? TimeFormat(post?.created) : ''}</p>
                <p>Last updated: {post?.updated ? TimeFormat(post?.updated) : ''}</p>
            </span>
            <strong className="font-bold text-3xl">{post?.title}</strong>

            <div className='text-justify' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            <div className="flex flex-wrap gap-2">
                {post?.tag_list?.map((tag, i) => (
                    <Link key={i} to={`/search/${tag.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white">#{tag}</Link>
                ))}
            </div>
            <Comment id={id} />
        </div>
    )
}

export default PostViewMain