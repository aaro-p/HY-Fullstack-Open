import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginFrom from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [user,setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()  => {
    fetchBlogs()
  },[])

  useEffect(() => {
    const loggedUserJson = localStorage.getItem('user')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const showNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    },5000)
  }

  const blogFormRef = useRef()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setPassWord('')
    } catch (expection) {
      showNotification({ type: 'error' , message: 'wrong username or password' })
    }
  }

  const logOut = () => {
    localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      await fetchBlogs()
      showNotification({ type: 'info', message: `a new blog ${blogObject.title} by ${blogObject.author} added` })
    } catch (error) {
      showNotification({ type: 'error', message: error.response.data.error })
    }
  }

  const updateBlog = async (blogId,blog) => {
    try {
      await blogService.update(blogId,blog)
      await fetchBlogs()
    } catch (error){
      showNotification({ type: 'error', message: error.response.data.error })
    }
  }

  const sortBlogsByLikes = (blogs) => {
    return blogs.sort((a,b) => b.likes - a.likes)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try {
        await blogService.remove(blog.id)
        await fetchBlogs()
      } catch (error) {
        showNotification({ type: 'error', message: error.response.data.error })
      }
    }
  }

  return (
    <div>
      {notification &&
        <Notification type={notification.type} message={notification.message}/>
      }
      {!user &&
        <Togglable buttonLabel="log in">
          <LoginFrom
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUserNameChange={({ target }) => setUserName(target.value)}
            handlePasswordChange={({ target }) => setPassWord(target.value)}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in <button onClick={logOut}>log out</button></p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          <div>
            {sortBlogsByLikes(blogs).map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={updateBlog} handleDelete={deleteBlog} userName={user.name}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App