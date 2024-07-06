import { Link, NavLink } from "react-router-dom"
import { CustomModal } from "../utils"
import { useState } from "react"
import { Cross, Search } from "../Icons"


const Navbar = () => {

  const [isModalOpen, setModalOpen] = useState<any>({ search: false, subscribe: false })

  const handleOpenModal = (type: any) => {
    type === "subscribe" ?
      setModalOpen({ ...isModalOpen, subscribe: true }) :
      setModalOpen({ ...isModalOpen, search: true })
  }
  const handleCloseModal = () => setModalOpen({ search: false, subscribe: false })

  const sampleBlog = [
    "Django developer needed for our company",
    "Django auth token simple json web token session token all-auth token",
    "Django auth token simple json web token session token all-auth token",
    "Django auth token simple json web token session token all-auth token",
    "Django auth token simple json web token session token all-auth token",
    "Django auth token simple json web token session token all-auth token",
    "Django auth token simple json web token session token all-auth token",
    "Django auth token simple json web token session token all-auth token",
    "Django auth token simple json web token session token all-auth token",
    "Django auth token simple json web token session token all-auth token",
    " Keir Starmer will be Britain's next prime minister with his centre left Labour Party expected to "
  ]

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const handleSearch = (e: any) => {
    setSearch(e.target.value)
    setSearchResults(sampleBlog.filter((blog) => blog.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <div className="pt-4 px-[10%] bg-blue-600">
      <div className="flex justify-between items-center pb-4">
        <Link to="/" className="text-[24px] font-semibold bg-white text-blue-700 px-10 pt-1 pb-2 flex justify-center items-center rounded-md">Blog</Link>
        <div className="flex items-center gap-6 font-semibold text-white">
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/profile/hghjg">Profile</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </div>
        <div className="flex gap-8 items-center">
          <Search onClick={() => handleOpenModal("search")} stroke="white" />
          <button onClick={() => handleOpenModal("subscribe")} className="px-6 py-2 text-blue-600 bg-white rounded-md font-semibold">Subscribe</button>
        </div>
      </div>
      <CustomModal isOpen={isModalOpen.search} onClose={handleCloseModal} >
        <div className="bg-white rounded-md px-8 py-2 flex items-center gap-6">

          <input
            type="text"
            placeholder="Search.."
            className=" border-none outline-none focus:ring-0 focus:!border-none focus:!outline-none focus:outline-offset-0 w-full "
            value={search}
            onChange={handleSearch}
          />
          {/* <span className="text-md text-red-500 hover:underline cursor-pointer">clear</span> */}
          <Cross className="cursor-pointer" onClick={() => setSearch("")} />
          <Search className="" />
        </div>
        <div className={`py-4 ${searchResults.length !== 0 && search.length !== 0 ? '' : 'hidden'}`}>
          <div className="bg-white rounded-b rounded-l rounded-r border-t-2 flex flex-col max-h-[400px] overflow-y-auto">
            {searchResults.map((blog) => (
              <strong className="py-2 px-6 cursor-pointer border-b hover:bg-blue-100 hover:text-blue-600">{blog}</strong>
            ))}

          </div>
        </div>
      </CustomModal>
      <CustomModal isOpen={isModalOpen.subscribe} onClose={handleCloseModal}>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Subscribe</span>
            <Cross className="cursor-pointer" onClick={handleCloseModal} />
          </div>
          <div className="flex justify-center items-center gap-6">
            <input type="email" placeholder="Email" className="rounded-md" />
            <button type="submit" className="rounded-md font-semibold bg-blue-200 text-blue-700 py-[10px] px-6 hover:bg-slate-100">Subscribe</button>
          </div>
        </div>
      </CustomModal>

    </div>
  )
}

export default Navbar