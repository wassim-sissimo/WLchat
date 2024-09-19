import { useState } from "react"
import { auth } from "../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import { dataBase } from "../firebaseConfig"
import { collection, doc,getDoc,getDocs,query,setDoc, where } from "firebase/firestore"
import { Upload } from "../upload"
import { useUserStore } from "../../public/zustand"
import { useChatStore } from "../useChatStor"
import avatar from  "../assets/imgs/avatar.png"
                    

export const CreateAnAcount=()=>{
    const [profilePic,setProfilePic]=useState({
        file:null,
        url:""
    })
    const {openTheChat,openTHeInfo}=useChatStore()
    const [loading,setLoading]=useState(false)

    const handelChange=(e)=>{
        if(e.target.files[0]){
        setProfilePic({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
        }
    }

    const handelSignUp=async (e)=>{
        e.preventDefault()
        setLoading(true)
        const formData=new FormData(e.target)
        const {userName,email,passWord}=Object.fromEntries(formData)


        const usersRef=collection(dataBase,"user")
        const q=query(usersRef,where("userName",'==',userName))
        const querySnapShot=await getDocs(q)
        if(!querySnapShot.empty){
            toast.warn("this user name is taken ! pleas use another one")
        }
       
        try{
            const profilePicUrl=await Upload(profilePic.file)
            const res=await createUserWithEmailAndPassword(auth,email,passWord)
            await setDoc(doc(dataBase,"user",res.user.uid),{
                userName,
                email,
                id:res.user.uid,
                blocked:[],
                profilePicUrl
            })

            await setDoc(doc(dataBase,"userChats",res.user.uid),{
                chats:[]
            })
            
            
           
            toast.success('your acount has been created you can now log in')
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }finally{
            setLoading(false)
            openTheChat(false)
            openTHeInfo(false)
            
        }
    }
    return(
        <div>
            <p className="capitalize text-white font-bold text-[22px] ">creat an account</p>
            <div className="flex">
                <img src={profilePic.url || avatar} alt=""  className="w-9 h-9 mr-5 object-cover rounded"/>
                <label htmlFor="file" className="text-white underline cursor-pointer">pick a profil picure</label>
                <input type="file"  id="file" className="hidden"  onChange={handelChange}/>
            </div>

            <form className="flex flex-col gap-3 py-3" onSubmit={handelSignUp}>
                <input type="text" placeholder="user name "  className="p-2 text-white capitalize rounded outline-none bg-inbg" name="userName"/>
                <input type="email"  placeholder="email" className="p-2 text-white capitalize rounded outline-none bg-inbg" name="email"/>
                <input type="password"  placeholder="password" className="p-2 text-white capitalize rounded outline-none bg-inbg" name="passWord"/>
                <button className="w-full bg-blue-500 text-white capitalize py-2 rounded ">{loading?"loading": "sign up"}</button>
            </form>
        </div>
    )
}