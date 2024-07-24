import { Link, NavLink, useNavigate } from "react-router-dom"
import { CustomModal, DropdownMenu } from "../utils"
import React, { useContext, useState } from "react"
import { Cross, Search } from "../Icons"
import { MenuItemProps } from "../utils/types"
import { PostsContext } from "../context/postsContext"
import { PostTypes } from "./Home/HomeMain"
import Cookies from "js-cookie"
import { AuthContext } from "../context/AuthContext"


const menuItems: MenuItemProps[] = [
  { type: 'link', label: 'Blog', href: '/blog' },
  { type: 'link', label: 'News', href: '/news' },
  { type: 'link', label: 'Profile', href: `/profile/${Cookies.get("name")}` },
  { type: 'link', label: 'Login', href: '/login' },
  { type: 'link', label: 'Write', href: '/create_post' },
  { type: 'button', label: 'Sign out', onClick: () => console.log('Signing out...') },
]

const Navbar = () => {
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState<any>({ search: false, subscribe: false })
  const name = Cookies.get("username")
  const authContext = useContext(AuthContext)

  const handleOpenModal = (type: any) => {
    type === "subscribe" ?
      setModalOpen({ ...isModalOpen, subscribe: true }) :
      setModalOpen({ ...isModalOpen, search: true })
  }
  const handleCloseModal = () => setModalOpen({ search: false, subscribe: false })

  const { posts }: any = useContext(PostsContext)

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<PostTypes[]>([])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setSearchResults(posts.filter((post: any) => post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
    ))
  }

  const searchNavigate = (e: any, id: any) => {
    e.preventDefault()
    navigate(`/post/${id}`)
    handleCloseModal()
  }

  const onLogout = (e: any) => {
    e.preventDefault()
    Cookies.remove("access_token")
    Cookies.remove("google_token")
    Cookies.remove("username")
    authContext.getAuth()
    navigate("/")
  }

  return (
    <div className="pt-4 px-4 md:px-[10%] bg-blue-600">
      <div className="flex justify-between items-center pb-4">
        <Link to="/" className="text-lg sm:text-[24px] font-semibold bg-white text-blue-700 px-10 pt-1 pb-2 flex justify-center items-center rounded-md">Blog</Link>
        <div className="hidden mh:flex mh:items-center mh:gap-6 font-semibold text-white">
          {authContext.authenticated ?
            <>
              <NavLink to="/news">News</NavLink>
              <NavLink to={`/profile/${name}`}>Profile</NavLink>
              <NavLink to="/create_post">Write</NavLink>
              <button onClick={onLogout}>Logout</button>
            </>
            :
            <>
              <NavLink to="/news">News</NavLink>
              <NavLink to="/create_post">Write</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          }
        </div>
        <div className="flex gap-8 items-center">
          <Search onClick={() => handleOpenModal("search")} stroke="white" />
          <button onClick={() => handleOpenModal("subscribe")} className="px-6 py-2 text-blue-600 bg-white rounded-md font-semibold hidden sm:block">Subscribe</button>
          <DropdownMenu buttonText="" menuItems={menuItems} className="mh:hidden" />
        </div>
      </div>
      <CustomModal isOpen={isModalOpen.search} onClose={handleCloseModal} widthClass="w-full sm:w-[350px] sm:max-w-[350px]" className="pt-[70px]">
        <div className="bg-white rounded-md px-8 py-2 flex items-center gap-6">
          <input
            type="text"
            placeholder="Search.."
            className=" border-none outline-none focus:ring-0 focus:!border-none focus:!outline-none focus:outline-offset-0 w-full "
            value={search}
            onChange={handleSearch}
          />
          <Cross className="cursor-pointer" onClick={() => setSearch("")} />
          <Search className="" />
        </div>
        <div className={`py-4 ${searchResults.length !== 0 && search.length !== 0 ? '' : 'hidden'}`}>
          <div className="bg-white rounded-b rounded-l rounded-r border-t-2 flex flex-col max-h-[400px] overflow-y-auto">
            {searchResults.map((post, i) => (
              <span key={i} onClick={(e) => searchNavigate(e, post.id)} className="py-2 px-6 cursor-pointer border-b hover:bg-blue-100 hover:text-blue-600">{post.title}</span>
            ))}
          </div>
        </div>
      </CustomModal>
      <CustomModal isOpen={isModalOpen.subscribe} onClose={handleCloseModal} className="pt-[230px]">
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