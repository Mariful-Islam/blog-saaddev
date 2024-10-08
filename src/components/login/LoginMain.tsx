import Illustration from "./Illustration"
import LoginForm from "./LoginForm"

const LoginMain = () => {
    return (
        <div className="flex flex-col-reverse md:flex md:flex-row md:justify-center md:items-center">
            <Illustration />
            <LoginForm />
        </div>
    )
}

export default LoginMain