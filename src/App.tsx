import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import { RootLayout } from './layout'
import { Home, PostCreate, Profile, PostView, News, Login, Signup } from './pages'
import PostsProvider from './context/postsContext'
import { ProfileProvider } from './context/ProrfileContext'
import ScrollToTop from './utils/ScrollToTop'
import AuthProvider from './context/AuthContext'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import EditPost from './pages/EditPost'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <ProfileProvider>
          <AuthProvider>
            <Provider store={store}>
            <ScrollToTop />
            <Routes>
              <Route element={<RootLayout />} >
                <Route index element={<Home />} />
                <Route path="news" element={<News />} />
                <Route path="create_post" element={<PostCreate />} />
                <Route path="profile/:name" element={<Profile />} />
                <Route path="post/:slug" element={<PostView />} />
                <Route path="post/:slug/edit/" element={<EditPost />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
            <ToastContainer/>
            </Provider>
          </AuthProvider>
        </ProfileProvider>
      </PostsProvider>
    </BrowserRouter>
  )
}

export default App
