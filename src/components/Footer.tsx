import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="h-[500px] px-4 md:px-[10%] py-10 mt-[100px] border-t flex flex-row gap-12">
            <div>
                <strong className="text-4xl">Mariful Islam</strong>
                <p>I am a software engineer at Bytenyx Limited</p>
                <p>mariful@heliosinsider.com</p>

            </div>
            <div className="flex flex-col gap-2">
                <strong className="text-xl pb-4">Projects</strong>
                <ul>
                    <li><Link to="https://mms-saaddev.vercel.app/" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">MMS</Link></li>
                    <li><Link to="https://fin-saaddev.vercel.app/" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">Fin</Link></li>
                    <li><Link to="https://ecom-saaddev.vercel.app/" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">Ecom</Link></li>

                </ul>
            </div>
        </div >
    )
}

export default Footer