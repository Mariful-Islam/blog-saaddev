import { Helmet } from "react-helmet-async"
import Illustration from "../login/Illustration"
import SignupForm from "./SignupForm"

const SIgnupMain = () => {
    return (
        <div className="flex flex-col-reverse md:flex md:flex-row md:justify-center md:items-center">
            <Helmet>
                <title>Saad Insider | Sign Up</title>
                <meta title="description" content="Sign up in saad insider to know about programming."/>
                <link rel="canonical" href="/signup"/>
            </Helmet>
            <Illustration />
            <SignupForm />
        </div>
    )
}

export default SIgnupMain