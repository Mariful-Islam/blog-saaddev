import { createContext, useEffect, useState, ReactNode } from "react";
import useApi from "../utils/api";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";

export const AuthContext = createContext<any | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const api = useApi();
    const [authenticated, setAutheticated] = useState<boolean>()
    const [token, setToken] = useState('')
    const access_token = Cookies.get("access_token") ?? token

    useEffect(() => {
        getAuth()
    }, [token]);

    const getAuth = () => {
        const formData = new FormData()
        formData.append("token", access_token)
        api.tokenVerify(formData).then((response: AxiosResponse) => {
            setAutheticated(response.data)
            console.log(response.data)
        }).catch((error) => console.log("Error fetching auth:", error))
    }

    const postsData: any = {
        getAuth: getAuth,
        authenticated: authenticated,
        setToken: setToken,
        token: token
    };

    return (
        <AuthContext.Provider value={postsData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
