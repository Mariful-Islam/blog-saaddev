import { Link, useParams } from "react-router-dom";
import { Github, Linkedin, Location, Twitter } from "../Icons";
import { useState, ChangeEvent, useEffect } from "react";
import useApi from "../utils/api";
import { PostTypes } from "../components/Home/HomeMain";


const Profile = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const { name } = useParams()
    const api = useApi()
    const [userPosts, setUserPosts] = useState<PostTypes[]>([])
    useEffect(() => {
        getUserPosts()
    }, [])
    const getUserPosts = async () => {
        try {
            const response = await api.userPosts(name ? name : "")
            setUserPosts(response.data)
        } catch (error) {
            console.log("Error fetching user posts", error)
        }
    }
    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfileImage(e.target.files[0]);
        }
    };

    return (
        <div className="px-4 md:px-[10%] flex flex-col gap-8">
            <div className="h-[400px] relative border border-blue-600">
                <div className="bg-blue-600 h-[150px]"></div>
                <div className="absolute top-[85px] right-[50%] translate-x-[50%] rounded-full h-[120px] w-[120px] border border-blue-600 group">
                    <label htmlFor="profile_image">
                        {profileImage ? (
                            <img
                                src={URL.createObjectURL(profileImage)}
                                alt="Profile"
                                className="rounded-full h-[120px] w-[120px] group-hover:opacity-75 cursor-pointer"
                            />
                        ) : (
                            <img
                                src="https://picsum.photos/id/1/200/300"
                                alt="Placeholder"
                                className="rounded-full h-[120px] w-[120px] group-hover:opacity-75 cursor-pointer"
                            />
                        )}
                    </label>
                    <input
                        id="profile_image"
                        type="file"
                        className="hidden"
                        onChange={onChangeImage}
                    />
                </div>
                <div className="pt-16 flex justify-center">
                    <strong className="text-2xl">{name}</strong>
                </div>
                <div className="pt-6 flex flex-col gap-6">
                    <div className="flex justify-center items-center gap-2">
                        <Location className="h-6 w-6" /> Rajshahi, Bangladesh
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Link to="#"><Linkedin className="h-6 w-6" /></Link>
                        <Link to="#"><Github className="h-6 w-6" /></Link>
                        <Link to="#"><Twitter className="h-6 w-6" /></Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-6">
                <div className="p-4 flex flex-col gap-3 border border-blue-600 shadow-lg rounded-md w-full">
                    <strong className="text-xl border-b">Bio</strong>
                    <p className="text-md text-gray-500 text-justify">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi necessitatibus numquam eligendi ex, asperiores facilis, eveniet autem labore officia iste illo, distinctio tempore mollitia perferendis. Impedit, numquam libero! Incidunt, consectetur.
                    </p>
                </div>
                <div className="flex flex-col sm:flex sm:flex-row gap-4 w-full pb-10">
                    <div className="border border-blue-600 shadow-lg rounded-md h-[200px] w-full sm:w-[30%] p-4">
                        mkcpjfvkf
                    </div>
                    <div className="flex flex-col gap-4 border border-blue-600 shadow-lg rounded-md w-full sm:w-[70%] p-4">
                        {userPosts.map((post) => (
                            <div className="border-b-2 pb-3 flex flex-col gap-4">
                                <Link to={`/post/${post.id}/`} className="text-xl font-semibold hover:text-blue-600">{post.title}</Link>
                                <p>
                                    {post.content}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tag_list.map((tag) => (
                                        <Link to={`/search/${tag.toLowerCase()}`} className="py-[2px] rounded-md px-3 text-sm bg-blue-50 text-blue-600 hover:bg-white">#{tag}</Link>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    <Link to={`/profile/saad`} className="text-blue-600 cursor-pointer hover:underline">{post.user}</Link> <span className="text-sm">{post.updated}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
