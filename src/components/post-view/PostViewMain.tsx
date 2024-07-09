import axios from 'axios'
import { useState } from 'react'
import { QuillEditor } from '../../utils'

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
    const post = "<h1>iojcidfovjcdf</h1> <div class='text-xl font-medium text-black'>Title</div> <p class='text-gray-500'>This is a paragraph styled using Tailwind CSS.</p>"


    const [blog, setBlog] = useState<BlogTypes>()
    axios.get("https://saaddev.pythonanywhere.com/blog/post/30/").then((response) => setBlog(response.data)).catch((error) => console.log(error))
    const [text, setText] = useState<string>("")
    return (
        <div className="px-[12%]">
            <strong className="font-bold text-xl">heloo</strong>
            <div className="flex justify-between">
                <span>Saad</span> <span>12 jun 2024</span>
            </div>
            <QuillEditor value={text} onChange={setText} />
            <div className='text-justify ' dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
}

export default PostViewMain