import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';
import { TimeFormat } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import useApi from '../../utils/api';
import Comment from './Comment';
import { Helmet } from 'react-helmet-async';


export interface BlogTypes {
    id: number;
    user: string;
    username: string;
    title: string;
    description: string;
    created: string;
    updated: string;
    tag: string;
    views: string;
    meta_title: string;
    meta_description: string;
    slug: string;
}


const PostViewMain = () => {
    const { slug }: any = useParams()
    const api = useApi()
    const [post, setPost] = useState<BlogTypes>()

    useEffect(() => {
        getPost()
    }, [])
    const getPost = () => {
        api.post(slug ? slug : '').then((response) => setPost(response.data)).catch((error) => console.log(error))
    }
    const sanitizeddescription = DOMPurify.sanitize(post?.description || '');

    return (
        <>
        <Helmet>
            <title>{post?.title}</title>
            <meta name="description" content={post?.meta_description}/>
            <link rel="canonical" href={`/posts/${post?.slug}`} />
        </Helmet>
        <div className="px-6 md:px-[12%] py-10 flex flex-col gap-4">
            <div className="flex justify-between">
                <Link to={`/profile/${post?.username}`} className='text-blue-600 font-semibold hover:underline'>{post?.username}</Link>
                <div className='flex flex-col text-[12px] items-end text-gray-600'>
                    <span>{post?.created ? TimeFormat(post?.created) : ''}</span>
                    <span>Last updated: {post?.updated ? TimeFormat(post?.updated) : ''}</span>
                </div>
            </div>
          

                    <strong className="font-bold text-3xl">{post?.title}</strong>
                    <div className='text-justify text-wrap flex-wrap' dangerouslySetInnerHTML={{ __html: sanitizeddescription }} />
                    <div className="flex flex-wrap gap-2">
                        {post?.tag?.split(",")?.map((tag, i) => (
                            <Link key={i} to={`/search/${tag.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white">#{tag}</Link>
                        ))}
                    </div>
            <Comment slug={slug} />
        </div >
        </>
    )
}

export default PostViewMain