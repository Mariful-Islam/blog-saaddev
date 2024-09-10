import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';
import { TimeFormat } from '../../utils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useApi from '../../utils/api';
import Comment from './Comment';
import { QuillEditor, Select } from '../../utils';
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
    const navigate = useNavigate()

    useEffect(() => {
        getPost()
    }, [])
    const getPost = () => {
        api.post(slug ? slug : '').then((response) => setPost(response.data)).catch((error) => console.log(error))
    }
    const sanitizeddescription = DOMPurify.sanitize(post?.description || '');

    // const [openEdit, setOpenEdit] = useState<boolean>(false)
    // const onEdit = () => {
    //     console.log(slug)
    //     const formData = new FormData()
    //     formData.append('user', post?.username || '')
    //     formData.append('title', post?.title || '')
    //     formData.append('description', post?.description || '')
    //     formData.append('tag', post?.tag || '')
    //     api.editPost(slug, formData).then((response) => {
    //         console.log(response.data)
    //         getPost()
    //         setOpenEdit(false)
    //     }).catch((error) => console.log(error))

    // }

    // const onDelete = () => {
    //     api.deletePost(slug).then((response) => {
    //         console.log(response.data)
    //         navigate('/')
    //     }).catch((error) => console.log(error))
    // }
    return (
        <>
        <Helmet>
            <title>{post?.title}</title>
            <meta title="description" content="A blog for programming lover" />
            <link rel="canonical" href="/" />
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
                    <div className='text-justify' dangerouslySetInnerHTML={{ __html: sanitizeddescription }} />
                    <div className="flex flex-wrap gap-2">
                        {post?.tag?.split(",")?.map((tag, i) => (
                            <Link key={i} to={`/search/${tag.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white">#{tag}</Link>
                        ))}
                    </div>

                {/* <div className='flex flex-col gap-4 items-end'>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={post?.title}
                        onChange={(e: any) => setPost((prev: any) => ({ ...prev, title: e.target.value }))}
                        className="border-gray-300 w-full rounded-md mb-4" required
                    />
                    <div className='h-full w-full'>
                        <QuillEditor value={post?.description ? post?.description: ""} onChange={(description) => setPost((prev:any) => ({ ...prev, description: description }))} className="rounded-md w-full" />
                    </div>
                    <Select formData={post} setFormData={setPost} /><br />
                    <div className='flex gap-4 items-center justify-center'>
                        <button onClick={() => setOpenEdit(false)} className="px-6 py-2 bg-red-100 text-red-600 text-md rounded-md float-right hover:bg-red-200 mr-3" value="Cancel">Cancel</button>
                        <button onClick={onEdit} className="px-6 py-2 bg-blue-600 hover:bg text-white text-md rounded-md float-right hover:bg-blue-700">Update</button>
                    </div>
                </div> */}
            <Comment slug={slug} />
        </div >
        </>
    )
}

export default PostViewMain