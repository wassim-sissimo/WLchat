import { Left } from "./components/left"
import { LogIn } from "./components/login"
import { Middel } from "./components/middel"
import { Right } from "./components/right"
import { Notification } from "./components/notification"
import { useEffect } from "react"
import { useUserStore } from "../public/zustand"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebaseConfig"
import { useChatStore } from "./useChatStor"


const App = () => {
  const user=false
  const {currentUser,isLoading,fetchUser}=useUserStore()
  const {chatOpen}=useChatStore()

  useEffect(()=>{
     const authChange=onAuthStateChanged(auth,(user)=>{
      fetchUser(user?.uid)
      
     
     })

     return ()=>{
        authChange()
     }
  },[fetchUser])

  if(isLoading) return(<div className="py-5 px-8 bg-inbg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">loading</div>)
  return (
    <div className='w-screen h-screen   bg-[url("../public/bg.jpg")] bg-cover flex items-center justify-center'>
      
        <div className="w-[80%] h-[90%] overflow-hidden bg-global rounded-lg  backdrop-blur-md max-640:h-screen max-640:w-screen  flex ">
          {currentUser?(
            <>
            <Left />
            {chatOpen && <Middel/>}
            {chatOpen &&<Right/>}
            </>
              
          ):(
            <LogIn/>
          )

          }
            <Notification/>
        </div>
    </div>
  )
}

export default App