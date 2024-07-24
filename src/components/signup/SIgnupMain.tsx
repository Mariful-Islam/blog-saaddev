import Illustration from "../login/Illustration"
import SignupForm from "./SignupForm"

const SIgnupMain = () => {
    return (
        <div className="flex flex-col-reverse md:flex md:flex-row md:justify-center md:items-center">
            <Illustration />
            <SignupForm />
        </div>
    )
}

export default SIgnupMain