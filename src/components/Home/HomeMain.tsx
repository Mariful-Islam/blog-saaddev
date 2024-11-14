import { useDispatch } from "react-redux";
import { Carousel } from "../../utils";
import Category from "./category/Category";
import Posts from "./Posts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/postsSlice";


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
    const dispatch = useDispatch();
    const { posts, isLoaded } = useSelector((state: RootState) => state.posts);
  
    useEffect(() => {
      if (!isLoaded) {
        dispatch(fetchPosts() as any);
      }
    }, [dispatch]);

    return (
        <div>
            <div className="bg-blue-600">
                <Carousel items={items1} className="h-screen/2" />
            </div>
            
            <Category />

            <div className="px-4 md:px-[10%]">
                <Posts posts={posts} isLoaded={isLoaded}/>
            </div>
            
        </div>
    )
}

export default HomeMain