import { createContext, useEffect, useState } from "react";
import { PostTypes } from "../components/Home/HomeMain";
import Cookies from "js-cookie";
import axios from "axios";

export interface ProfileTypes {
    email: string;
    family_name: string;
    given_name: string;
    id: string;
    name: string;
    picture: string;
    verified_email: boolean;
}

interface ProfileContextTypes {
    getProfile: () => void;
    profile: ProfileTypes,
    setProfile: React.Dispatch<React.SetStateAction<PostTypes>>;
}
const ProfileContext = createContext<ProfileContextTypes | null>(null)
export default ProfileContext


export const ProfileProvider = ({ children }: any) => {
    const [profile, setProfile] = useState<ProfileTypes>()
    const access_token = Cookies.get("access_token")


    useEffect(() => {
        getProfile()
    }, [access_token])
    const getProfile = () => {
        if (access_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    setProfile(res.data);
                    Cookies.set("name", res.data.name)
                })
                .catch((err) => console.log(err));
        }
    }
    const profileData: any = {
        getProfile: getProfile,
        profile: profile,
        setProfile: setProfile,
    }
    console.log(profile)
    return (
        <ProfileContext.Provider value={profileData}>
            {children}
        </ProfileContext.Provider>
    )
}