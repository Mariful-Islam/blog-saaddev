import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useState } from "react"
import useApi from "../../utils/api"


const SignupForm = () => {
    const navigate = useNavigate()
    const api = useApi()
    const [user, setUser] = useState<any>()

    const onSignup = (e: any) => {
        e.preventDefault()
        if (e.target.password.value === e.target.password1.value) {
            const formData = new FormData()
            formData.append("username", e.target.username.value)
            formData.append("email", e.target.email.value)
            formData.append("password", e.target.password.value)
            formData.append("product", "blog")

            api.signup(formData).then((response: any) => {
                setUser(response.token)
                if (user?.token) {
                    Cookies.set("access_token", user.token)

                }
                console.log(response)
                navigate('/login')
            }).catch((error) => console.log(error))
        } else {
            console.log("Password not matched !!!")
        }
    }

    return (
        <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center gap-8 rounded-md">
            <strong className="text-5xl text-blue-600">Sign Up</strong>
            <p className="text-sm text-gray-500">Enlight your knowledge</p>
            <form onSubmit={onSignup} className="flex flex-col gap-3 w-full px-6 md:px-[50px] lg:px-[100px] xl:px-[150px]">
                <input type="text" name="username" placeholder="Username" className="border-gray-300 w-full rounded-md" />
                <input type="email" name="email" placeholder="Email" className="border-gray-300 w-full rounded-md" />
                <input type="password" name="password" placeholder="Password" className="border-gray-300 w-full rounded-md" />
                <input type="password" name="password1" placeholder="Confirm Password" className="border-gray-300 w-full rounded-md" />

                <button type="submit" className=" w-full py-2 mt-2 bg-blue-600 rounded-md text-white hover:bg-blue-700">Sign Up</button>
            </form>
            <div className="text-sm text-gray-400">
                Already have an account ? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
            </div>

        </div>
    )
}

export default SignupForm