import { useEffect, useState } from "react"
import { useUserStore } from "../../public/zustand"
import { getDoc, onSnapshot } from "firebase/firestore"
import { dataBase } from "../firebaseConfig"
import { doc } from "firebase/firestore"
import { useChatStore } from "../useChatStor"

export const LeftChats=()=>{
    const[userChats,setUserChats]=useState([])
    
    const {currentUser}=useUserStore()
    const {displayChat,openTheChat}=useChatStore()

    useEffect(()=>{
        const fetchChats=onSnapshot(doc(dataBase,"userChats",currentUser.id),async (res)=>{
            const items=res.data().chats

            const promisses=items.map(async (item)=>{
                const userDocRef=doc(dataBase,"user",item.resiverId)
                const userDocSnap= await getDoc(userDocRef )
                const user=userDocSnap.data()
                return {...item,user}
            })

            const chatData=await Promise.all(promisses)
            setUserChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        })
        return ()=>{
            fetchChats()
        }
    },[currentUser.id])

    const openChat=(chat)=>{
        
        displayChat(chat.chatId,chat.user)
        openTheChat()
        console.log("chat is open")
    }
    

    return(
        <div className="w-full  h-[76%] overflow-y-scroll  pt-5" style={{scrollbarWidth:"none", msOverflowStyle:"none"}}>
             {userChats.map((chat)=>{
                return(
                    <div key={chat.chatId} className="py-2  border-b flex  items-center space-x-2 border-bColor" onClick={()=>{openChat(chat)}}>
                        <img src={chat.user.profilePicUrl||"../public/avatar.png"} alt="" className="w-9 h-9  object-fill rounded-full" />
                        <div>
                            <p className="text-white font-semibold"> {chat.user.userName} </p>
                            <p className="text-white font-light">{chat.lastMessage}</p>
                        </div>
                    </div>
                )
            })} 
        </div>
    )
}