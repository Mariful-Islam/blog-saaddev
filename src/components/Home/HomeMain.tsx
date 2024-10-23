import { Link } from "react-router-dom";
import { Carousel, TimeFormat } from "../../utils";
import Category from "./category/Category";
import { extractImageUrlFromHTML } from "../../utils/extractImageUrlFromHTML";

import noImage from '../../assets/images/no-photo.jpg'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/postsSlice";
import { useDispatch } from "react-redux";

export interface PostTypes {
    id: number;
    user: string;
    username: string;
    title: string;
    description: string;
    tag: string;
    updated: string;
    created: string;
    meta_title: string;
    meta_description: string;
    slug: string;
}

const items1 = [
    <div className="flex flex-col justify-center items-center p-4 bg-blue-600 h-[300px]">
        <strong className="text-[40px] flex flex-wrap text-white">Technology Changing the World </strong>
        <span className="text-[20px] text-white font-bold">Machine Learning LLM DevOps</span>
    </div>,
    <div className="p-4 flex flex-col justify-center items-centerbg-blue-600 text-black text-center  h-[300px]">
        <strong className="text-[40px] text-white">Sharing knowledge</strong>
        <span className="text-[20px] text-white font-bold">Scrape to the pick</span>
    </div>,
    <div className="p-4 flex flex-col justify-center items-center bg-blue-600 text-black text-center  h-[300px]">
        <strong className="text-[40px] text-white">Problem Solving</strong>
        <span className="text-[20px] text-white font-bold">Makes your brain healthy</span>
    </div>
];

const HomeMain = () => {
    const dispatch = useDispatch()
    const { posts, isLoaded } = useSelector((state: RootState) => state.posts)

    useEffect(()=>{
        if(!isLoaded){
            dispatch(fetchPosts() as any)
        }
    }, [dispatch])

    console.log(posts, isLoaded)

    return (
        <div>
            <div className="bg-blue-600">
                <Carousel items={items1} className="h-screen/2" />
            </div>
            <>
                <Category />
            </>

            <div className="pt-12 px-4 md:px-[10%]">
                <strong>Total: {posts.length}</strong>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 py-8 px-4 md:px-[10%]">
                {posts?.map((post: any, index: number) => (
                    <div key={index} className="rounded-md flex flex-col gap-1">
                        <Link to={`/post/${post.slug}/`}>
                            <img src={extractImageUrlFromHTML(post.description)[0] ?? noImage} alt={post.slug} className="h-[220px] w-full object-cover"/>
                        </Link>
                        <Link to={`/post/${post.slug}/`} className="mt-2 text-xl font-semibold hover:text-blue-600 hover:underline cursor-pointer text-black no-underline transition-all duration-150 ease-linear">{post.title}</Link>
                       
                        <div className="flex justify-between items-center">
                            <Link to={`/profile/${post.username}`} className="text-blue-600 cursor-pointer no-underline hover:underline">{post.username}</Link>
                            <span className="text-sm text-gray-400">{TimeFormat(post.updated)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeMain