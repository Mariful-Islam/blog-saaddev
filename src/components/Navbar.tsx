import { Link, NavLink } from "react-router-dom"
import { CustomModal, DropdownMenu } from "../utils"
import React, { useState } from "react"
import { Cross, Search } from "../Icons"
import { MenuItemProps } from "../utils/types"



const menuItems: MenuItemProps[] = [
  { type: 'link', label: 'Blog', href: '/blog' },
  { type: 'link', label: 'News', href: '/news' },
  { type: 'link', label: 'Profile', href: `/profile/hghjg` },
  { type: 'link', label: 'Login', href: '/login' },
  { type: 'link', label: 'Signup', href: '/signup' },
  { type: 'button', label: 'Sign out', onClick: () => console.log('Signing out...') },
]

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
  const [searchResults, setSearchResults] = useState<string[]>([])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setSearchResults(sampleBlog.filter((blog) => blog.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <div className="pt-4 px-4 md:px-[10%] bg-blue-600">
      <div className="flex justify-between items-center pb-4">
        <Link to="/" className="text-lg sm:text-[24px] font-semibold bg-white text-blue-700 px-10 pt-1 pb-2 flex justify-center items-center rounded-md">Blog</Link>
        <div className="hidden mh:flex mh:items-center mh:gap-6 font-semibold text-white">
          <NavLink to="/news">News</NavLink>
          <NavLink to="/profile/hghjg">Profile</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </div>
        <div className="flex gap-8 items-center">
          <Search onClick={() => handleOpenModal("search")} stroke="white" />
          <button onClick={() => handleOpenModal("subscribe")} className="px-6 py-2 text-blue-600 bg-white rounded-md font-semibold hidden sm:block">Subscribe</button>
          <DropdownMenu buttonText="" menuItems={menuItems} className="mh:hidden" />
        </div>
      </div>
      <CustomModal isOpen={isModalOpen.search} onClose={handleCloseModal} widthClass="w-full sm:w-[400px]" className="pt-[70px]">
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