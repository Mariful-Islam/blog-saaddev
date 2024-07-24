import { createContext, useEffect, useState } from "react";
import { PostTypes } from "../components/Home/HomeMain";
import Cookies from "js-cookie";
import axios from "axios";
import useApi from "../utils/api";

export interface ProfileTypes {
    email?: string;
    family_name?: string;
    given_name?: string;
    id?: string;
    name?: string;
    username?: string;
    picture?: string;
    verified_email?: boolean;
}

interface ProfileContextTypes {
    getProfile: () => void;
    profile: ProfileTypes,
    setProfile: React.Dispatch<React.SetStateAction<PostTypes>>;
}
const ProfileContext = createContext<ProfileContextTypes | null>(null)
export default ProfileContext


export const ProfileProvider = ({ children, username }: any) => {
    const api = useApi()
    const [profile, setProfile] = useState<ProfileTypes>()
    const google_token = Cookies.get("google_token")
    const access_token = Cookies.get("access_token")
    useEffect(() => {
        getProfile()
    }, [profile])

    const getProfile = () => {
        if (google_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${google_token}`, {
                headers: {
                    Authorization: `Bearer ${google_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    setProfile(res.data);
                    Cookies.set("name", res.data.name)
                })
                .catch((err) => console.log(err));
        } else if (access_token) {
            const formData = new FormData()
            formData.append('username', username ?? '')
            api.getUser(formData).then((response) => setProfile(response.data)).catch((error) => console.log(error))
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