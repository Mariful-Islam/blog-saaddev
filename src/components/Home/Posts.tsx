import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../redux/postsSlice";
import { RootState } from "../../redux/rootReducer";
import { TimeFormat } from "../../utils";
import { Link } from "react-router-dom";
import { extractImageUrlFromHTML } from "../../utils/extractImageUrlFromHTML";
import noImage from '../../assets/images/no-photo.jpg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Posts() {
  const dispatch = useDispatch();
  const { posts, isLoaded } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchPosts() as any);
    }
  }, [dispatch]);

  return (
    <>
      <div className="pt-12 px-4 md:px-[10%]">
        <strong>Total: {!isLoaded ? <Skeleton count={1} width={30}/> : posts.length}</strong>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 py-8 px-4 md:px-[10%]">
        
        {isLoaded ? posts?.map((post: any, index: number) => (
          <div key={index} className="rounded-md flex flex-col gap-1">
            <Link to={`/post/${post.slug}/`}>
              {isLoaded ? <img
                src={extractImageUrlFromHTML(post.description)[0] ?? noImage}
                alt={post.slug}
                className="h-[220px] w-full object-cover"
              /> : <Skeleton count={1} height={300} width={200}/>}
            </Link>
            <Link
              to={`/post/${post.slug}/`}
              className="mt-2 text-xl font-semibold hover:text-blue-600 hover:underline cursor-pointer text-black no-underline transition-all duration-150 ease-linear"
            >
              {post.title}
            </Link>

            <div className="flex justify-between items-center">
              <Link
                to={`/profile/${post.username}`}
                className="text-blue-600 cursor-pointer no-underline hover:underline"
              >
                {post.username}
              </Link>
              <span className="text-sm text-gray-400">
                {TimeFormat(post.updated)}
              </span>
            </div>
          </div>
        )): 
          [1,2,3,4,5,6,7,8,9,10].map((_, index)=>(
            <>
            <Skeleton key={index} count={1} height={300} />
            <Skeleton key={index} count={1} />
            <div className="flex justify-between items-center">
              <Skeleton key={index} count={1} width={100}/>
              <Skeleton key={index} count={1} width={150}/>
            </div>
            </>
          ))
        }
      </div>
    </>
  );
}

export default Posts;
