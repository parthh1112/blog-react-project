import  { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components/"

function App() {

  // console.log(import.meta.env.VITE_APPWRITE_URL)   => to take the access of environment variable


  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())

        }
      })
      .catch((error) =>{
        throw error
      })
      .finally(() => setLoading(false))
  }, [])
  return (!loading) ? (

    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        parth
          {/* TODO:  <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>

  ) : (
    null
  );


}

export default App