import { Link } from "react-router-dom";
import { Github, Linkedin, Location, Twitter } from "../Icons";
import { useState, ChangeEvent } from "react";

const Profile = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfileImage(e.target.files[0]);
        }
    };

    return (
        <div className="px-[10%] flex flex-col gap-8">
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
                    <strong className="text-2xl">David Ivanov</strong>
                </div>
                <div className="pt-6 flex flex-col gap-6">
                    <div className="flex justify-center items-center gap-4">
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
                <div className="border border-blue-600 shadow-lg rounded-md h-[200px] w-full"></div>
                <div className="border border-blue-600 shadow-lg rounded-md h-[200px] w-[300px]"></div>
                <div className="border border-blue-600 shadow-lg rounded-md h-[200px] w-[300px]"></div>
                <div className="border border-blue-600 shadow-lg rounded-md h-[200px] w-[300px]"></div>
                <div className="border border-blue-600 shadow-lg rounded-md h-[200px] w-[300px]"></div>
                <div className="border border-blue-600 shadow-lg rounded-md h-[200px] w-[300px]"></div>
            </div>
        </div>
    );
};

export default Profile;
