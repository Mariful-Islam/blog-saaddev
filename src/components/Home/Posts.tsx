import { TimeFormat } from "../../utils";
import { Link } from "react-router-dom";
import { extractImageUrlFromHTML } from "../../utils/extractImageUrlFromHTML";
import noImage from '../../assets/images/no-photo.jpg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface PostProps {
  posts: any[];
  isLoaded: boolean;
}

function Posts({posts, isLoaded}: PostProps) {

  return (
    <>
      <div className="pt-12">
        <strong>Total: {!isLoaded ? <Skeleton count={1} width={30}/> : posts.length}</strong>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 py-8">
        
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
          [...Array(10)].map((_, index)=>(
            <div key={index}>
              <Skeleton count={1} height={300} />
              <Skeleton count={1} />
              <div className="flex justify-between items-center">
                <Skeleton count={1} width={100}/>
                <Skeleton count={1} width={150}/>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default Posts;
