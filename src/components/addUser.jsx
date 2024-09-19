import { arrayUnion, collection, doc, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { useState } from "react"
import { dataBase } from "../firebaseConfig"
import { toast } from "react-toastify"
import { getDocs } from "firebase/firestore"
import { useUserStore } from "../../public/zustand"

export const AddUser=({setAdd,add})=>{
    const {currentUser}=useUserStore()
    const [user,setUser]=useState("")
    const handelSearch=async(e)=>{
        e.preventDefault()
        const formData=new FormData(e.target)
        const {userName}=Object.fromEntries(formData)
        try{
        const userRef=collection(dataBase,"user")
        const q=query(userRef,where("userName","==",userName))
        const querySnapshot=await getDocs(q)
        if(!querySnapshot.empty){
            setUser(querySnapshot.docs[0].data())
        }
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }finally{
            console.log(user)
        }
    }
   
    const handelAdd=async()=>{
            const chatRef=collection(dataBase,"chats")
        try{
            const newChatRef=doc(chatRef)
            await setDoc(newChatRef,{
                createdAt:serverTimestamp(),
                messages:[]
            })



            await updateDoc(doc(dataBase,"userChats",user.id),{
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:"",
                    resiverId:currentUser.id,
                    updatedAt: Date.now()
                })
            })

            await updateDoc(doc(dataBase,"userChats",currentUser.id),{
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:"",
                    resiverId:user.id,
                    updatedAt: Date.now()
                })
            })


        }catch(err){
            console.log(err)
            toast.error(err)
        }finally{
            setAdd(false)
        }
    }
   
    return(
        <div className="absolute bg-neutral-500 p-3  rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <form className="flex space-x-2" onSubmit={handelSearch}>
                <input type="text" placeholder="add a user" className="py-2 px-2 rounded" name="userName"/>
                <button className="capitalize text-white py bg-blue-600 p-2 rounded" > submit </button>

            </form>
            {user && <div className="flex mt-5 justify-between">
                <div  className="flex space-x-3 items-center">
                    <img src={user.profilePicUrl||"/avatar.png"} alt="" className="w-9 h-9 rounded-full"/>
                    <p className="text-white"> {user.userName}</p>
                </div>
                <button className="capitalize text-white text-[12px] bg-blue-600 p-2 rounded" onClick={handelAdd}>add user</button>

            </div>}
            
        </div>
    )
}