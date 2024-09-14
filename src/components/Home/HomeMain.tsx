import { Link } from "react-router-dom";
import { Carousel, ExtractText, TimeFormat } from "../../utils";
import { useContext, useEffect } from "react";
import { PostsContext } from "../../context/postsContext";
import Category from "./category/Category";

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
    const { posts, getPosts }: any = useContext(PostsContext)
    useEffect(() => {
        getPosts()
    }, [])


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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 py-8 px-4 md:px-[10%]">
                {posts?.map((post: any, index: number) => (
                    <div key={index} className="border border-blue-600 p-6 rounded-md flex flex-col gap-4 shadow-lg">
                        <Link to={`/post/${post.slug}/`} className="text-xl font-semibold hover:text-blue-600 hover:underline cursor-pointer text-black no-underline">{post.title}</Link>
                        <p className="text-justify flex-wrap text-wrap">{ExtractText(post.description).slice(0, 200)}</p>
                        <div className="flex flex-wrap gap-2">
                            {post.tag.split(",").map((tag: any, i: number) => (
                                <Link key={i} to={`/search/${tag.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white no-underline">#{tag}</Link>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <Link to={`/profile/${post.username}`} className="text-blue-600 cursor-pointer hover:underline">{post.username}</Link>
                            <span className="text-[12px] text-gray-400">{TimeFormat(post.updated)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeMain