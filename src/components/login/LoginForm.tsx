import { Link, useNavigate } from "react-router-dom"
import google from "../../assets/icons/google.svg"
import fb from "../../assets/icons/facebook.svg"
import linkedin from "../../assets/icons/linkedin.svg"
import { useGoogleLogin } from "@react-oauth/google"
import Cookies from "js-cookie"
import { useContext } from "react"
import ProfileContext from "../../context/ProrfileContext"
import useApi from "../../utils/api"
import { AuthContext } from "../../context/AuthContext"


const LoginForm = () => {
    const api = useApi()
    const navigate = useNavigate()
    const profileContext = useContext(ProfileContext)
    const authContext = useContext(AuthContext)


    const onGoogleLogin = useGoogleLogin({
        onSuccess: (response: any) => {

            Cookies.set("google_token", response.access_token)
            profileContext?.getProfile()
            navigate("/")

        },
        onError: (error: any) => console.log(error)
    })

    const onLogin = (e: any) => {
        e.preventDefault()
        const data = new FormData()
        data.append('username', e.target.email.value.split('@')[0])
        data.append('password', e.target.password.value)

        api.login(data).then((response) => {
            if (response) {
                Cookies.set('access_token', response.data.token)
                Cookies.set('username', response.data.username)
                authContext.setToken(response.data.token)
                if (authContext.authenticated) {
                    navigate('/')
                }
            }
            console.log(response)
        }).catch((error) => console.log(error))


    }

    return (
        <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center gap-8 rounded-md">
            <strong className="text-5xl text-blue-600">Blog</strong>
            <p className="text-sm text-gray-500">Enlight your knowledge</p>
            <form onSubmit={onLogin} className="flex flex-col gap-3 w-full px-6 md:px-[50px] lg:px-[100px] xl:px-[150px]">
                <input type="email" name="email" placeholder="Email" className="border-gray-300 w-full rounded-md" />
                <input type="password" name="password" placeholder="Password" className="border-gray-300 w-full rounded-md" />
                <button type="submit" className=" w-full py-2 mt-2 bg-blue-600 rounded-md text-white hover:bg-blue-700">Login</button>
            </form>
            <div className="flex flex-col gap-3">
                <span className="text-sm text-gray-500">Don't have account? <Link to="/signup" className="text-sm text-blue-600 font-semibold hover:underline">Signup</Link> </span>
                <span className="text-sm text-gray-500">Forgot password <Link to="" className=" text-blue-600">click here</Link></span>
            </div>
            <div className="flex flex-col gap-5 items-center">
                <p className="text-sm text-gray-500">Or sign in with</p>
                <div className="flex gap-4">
                    <span onClick={() => onGoogleLogin()} className="cursor-pointer"><img src={google} alt="" style={{ height: 30, width: 30 }} /></span>
                    <span className="cursor-pointer"><img src={fb} alt="" style={{ height: 30, width: 30 }} /></span>
                    <span className="cursor-pointer"><img src={linkedin} alt="" style={{ height: 30, width: 30 }} /></span>
                </div>
            </div>
        </div>
    )
}

export default LoginForm