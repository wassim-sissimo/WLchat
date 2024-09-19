import { toast } from "react-toastify"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useEffect, useState } from "react"
import { useUserStore } from "../../public/zustand"
import { useChatStore } from "../useChatStor"

export const WelcomeBack=()=>{
    const [loading,setLoanding]=useState(false)

    const {openTheChat,openTHeInfo}=useChatStore()

    const handeleLogIn=async (e)=>{
        setLoanding(true)
        e.preventDefault()
        const formData =new FormData(e.target)
        const {email,password}=Object.fromEntries(formData)
        
       
        try{
            await signInWithEmailAndPassword(auth,email,password)
            toast.success("welcome back !")
        }catch(err){
            console.log(err) 
            toast.error("your cordenats are wrong or your account doesn't exist")
        }finally{
            setLoanding(false)
            openTheChat(false)
            openTHeInfo(false)
        }
        

    }
    return(
        <form onSubmit={handeleLogIn}>
            <p className="capitalize text-white font-bold text-[22px] ">welcome Back</p>
            <input type="text"  className="my-2 py-2 px-2 bg-inbg rounded-sm text-white" placeholder="email" name="email"/>
            <br />
            <input type="password"  className="py-2 px-2 bg-inbg rounded-sm text-white" placeholder="enter password"  name="password"/>
            <br />
            <button className="text-white capitalize mt-3 bg-blue-500 w-full py-2 rounded">{loading?"loaing":"sign in"}</button>
        </form>
    )
}