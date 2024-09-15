import { Link, NavLink, useNavigate } from "react-router-dom";
import { CustomModal } from "../utils";
import React, { useContext, useState } from "react";
import { Cross, Search } from "../Icons";
import { PostsContext } from "../context/postsContext";
import { PostTypes } from "./Home/HomeMain";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { useOutsideClick } from "../utils/useOutsideClick";

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState<any>({
    search: false,
    subscribe: false,
    nav: false,
  });
  const name = Cookies.get("username");
  const authContext = useContext(AuthContext);

  const handleOpenModal = (type: any) => {
    type === "subscribe"
      ? setModalOpen({ ...isModalOpen, subscribe: true })
      : setModalOpen({ ...isModalOpen, search: true });
    // if (type === "nav"){
    //   setModalOpen({ ...isModalOpen, nav: true })
    // }
  };
  const handleCloseModal = () =>
    setModalOpen({ search: false, subscribe: false, nav: false });

  const { posts }: any = useContext(PostsContext);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<PostTypes[]>([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchResults(
      posts.filter(
        (post: any) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const searchNavigate = (e: any, slug: any) => {
    e.preventDefault();
    navigate(`/post/${slug}`);
    handleCloseModal();
  };

  const onLogout = (e: any) => {
    e.preventDefault();
    Cookies.remove("access_token");
    Cookies.remove("google_token");
    Cookies.remove("username");
    authContext.getAuth();
    navigate("/");
  };

  const onNavClose = () => {
    setModalOpen({ ...isModalOpen, nav: false })
  }
  const modalRef = useOutsideClick(onNavClose)

  return (
    <>
      <div
        ref={modalRef}
        className={`${isModalOpen.nav ? "translate-x-0" : "translate-x-full" } md:hidden w-[70%] fixed transform transition-transform duration-200 ease-linear flex flex-col gap-2 text-blue-600  right-0 bg-white h-screen shadow-2xl border p-8  z-50`}
      >
        <div
          className="flex justify-end cursor-pointer"
          onClick={() => setModalOpen({ ...isModalOpen, nav: false })}
        >
          <Cross />
        </div>
        {authContext.authenticated ? (
          <>
            <NavLink to="/news" onClick={() => setModalOpen({ ...isModalOpen, nav: false })}>News</NavLink>
            <NavLink to={`/profile/${name}`} onClick={() => setModalOpen({ ...isModalOpen, nav: false })}>Profile</NavLink>
            <NavLink to="/create_post" onClick={() => setModalOpen({ ...isModalOpen, nav: false })}>Write</NavLink>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/news" onClick={() => setModalOpen({ ...isModalOpen, nav: false })}>News</NavLink>
            <NavLink to="/create_post" onClick={() => setModalOpen({ ...isModalOpen, nav: false })}>Write</NavLink>
            <NavLink to="/login" className="bg-blue-600 py-1 text-center text-white rounded-md hover:bg-blue-800 mt-12" onClick={() => setModalOpen({ ...isModalOpen, nav: false })}>Login</NavLink>
          </>
        )}
      </div>

      <div className="pt-4 px-4 md:px-[10%] bg-blue-600">
        <div className="flex justify-between items-center pb-4">
          <Link
            to="/"
            className="no-underline hover:bg-gray-300 transition-all duration-150 ease-linear text-lg sm:text-[10px] font-semibold bg-white text-blue-700 px-10 py-0  flex justify-center items-center rounded-md"
          >
            <strong className="text-xl  py-1">SIB</strong>
          </Link>
          <div className="hidden md:bg-transparent md:flex md:flex-row md:items-center md:gap-6 font-semibold md:text-white">
            {authContext.authenticated ? (
              <>
                <NavLink to="/news" className="text-white no-underline hover:text-gray-300 transition-all duration-200 ease-linear">News</NavLink>
                <NavLink to={`/profile/${name}`} className="text-white no-underline hover:text-gray-300 transition-all duration-200 ease-linear">Profile</NavLink>
                <NavLink to="/create_post" className="text-white no-underline hover:text-gray-300 transition-all duration-200 ease-linear">Write</NavLink>
                <button onClick={onLogout} className="text-white no-underline hover:text-gray-300 transition-all duration-200 ease-linear">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/news" className="text-white no-underline hover:text-gray-300 transition-all duration-200 ease-linear">News</NavLink>
                <NavLink to="/create_post" className="text-white no-underline hover:text-gray-300 transition-all duration-200 ease-linear">Write</NavLink>
                <NavLink to="/login" className="text-white no-underline hover:text-gray-300 transition-all duration-200 ease-linear">Login</NavLink>
              </>
            )}
          </div>
          <div className="flex gap-8 items-center">
            <Search
              onClick={() => handleOpenModal("search")}
              stroke="white"
              className="cursor-pointer"
            />
            <div
              className="flex flex-col gap-[6px] cursor-pointer md:hidden"
              onClick={() => setModalOpen({ ...isModalOpen, nav: true })}
            >
              <span className="h-[2px] w-6 bg-white"></span>
              <span className="h-[2px] w-5 bg-white"></span>
              <span className="h-[2px] w-6 bg-white"></span>
            </div>
            <button
              onClick={() => handleOpenModal("subscribe")}
              className="px-6 py-2 text-blue-600 bg-white hover:bg-gray-300 rounded-md font-semibold hidden sm:block transition-all duration-200 ease-linear"
            >
              Subscribe
            </button>
          </div>
        </div>
        <CustomModal
          isOpen={isModalOpen.search}
          onClose={handleCloseModal}
          widthClass="w-full sm:w-[350px] sm:max-w-[350px]"
          className="pt-[70px]"
        >
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
          <div
            className={`py-4 ${searchResults.length !== 0 && search.length !== 0 ? "" : "hidden"}`}
          >
            <div className="bg-white rounded-b rounded-l rounded-r border-t-2 flex flex-col max-h-[400px] overflow-y-auto">
              {searchResults.map((post, i) => (
                <span
                  key={i}
                  onClick={(e) => searchNavigate(e, post.slug)}
                  className="py-2 px-6 cursor-pointer border-b hover:bg-blue-100 hover:text-blue-600"
                >
                  {post.title}
                </span>
              ))}
            </div>
          </div>
        </CustomModal>
        <CustomModal
          isOpen={isModalOpen.subscribe}
          onClose={handleCloseModal}
          className="pt-[230px]"
        >
          <div className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Subscribe</span>
              <Cross className="cursor-pointer" onClick={handleCloseModal} />
            </div>
            <div className="flex justify-center items-center gap-6">
              <input type="email" placeholder="Email" className="rounded-md" />
              <button
                type="submit"
                className="rounded-md font-semibold bg-blue-100 text-blue-700 py-[10px] px-6 hover:bg-blue-200 transition-all duration-150 ease-linear"
              >
                Subscribe
              </button>
            </div>
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default Navbar;
