import { Link } from "react-router-dom"
import Redirect from "../assets/icons/Redirect.png"

const Footer = () => {
    return (
        <div className="h-[600px] md:h-[400px] px-4 md:px-[10%] py-10 mt-[100px] border-t flex flex-col md:flex md:flex-row gap-12">
            <div className="flex flex-col gap-6 justify-center items-center md:items-start">
                <strong className="text-4xl">Mariful Islam</strong>
                <div>
                    <p>Software engineer at Bytenyx Limited</p>
                    <p>mariful@heliosinsider.com</p>
                    <Link to="https://saaddev-io.vercel.app/" target="__blank" className="flex items-center gap-1 hover:text-blue-600 hover:underline">website <img src={Redirect} style={{ height: 15, width: 15, fill: 'blue' }} alt="" /></Link>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <div className="flex flex-col gap-2">
                    <strong className="text-xl pb-4">Services</strong>
                    <ul className="list-none flex flex-col gap-2">
                        <li><Link to="https://saaddev-io.vercel.app/service/4" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">GIS development</Link></li>
                        <li><Link to="https://saaddev-io.vercel.app/service/1" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">Web Development</Link></li>
                        <li><Link to="https://saaddev-io.vercel.app/service/" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">Custom Software Development</Link></li>

                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <strong className="text-xl pb-4">Projects</strong>
                    <ul className="list-none flex flex-col gap-2">
                        <li><Link to="https://mms-saaddev.vercel.app/" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">MMS</Link></li>
                        <li><Link to="https://fin-saaddev.vercel.app/" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">Fin</Link></li>
                        <li><Link to="https://ecom-saaddev.vercel.app/" target="__blank" className="font-semibold hover:text-blue-600 hover:underline">Ecom</Link></li>

                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Footer