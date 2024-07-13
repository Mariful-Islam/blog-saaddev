import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import { RootLayout } from './layout'
import { Home, PostCreate, Profile, PostView, News } from './pages'
import PostsProvider from './context/postsContext'


function App() {


  return (
    <BrowserRouter>
      <PostsProvider>
        <Routes>
          <Route element={<RootLayout />} >
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="create_post" element={<PostCreate />} />
            <Route path="profile/:name" element={<Profile />} />
            <Route path="post/:id" element={<PostView />} />
          </Route>
        </Routes>
      </PostsProvider>
    </BrowserRouter>
  )
}

export default App
