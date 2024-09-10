import { useEffect, useState } from "react"
import { useUserStore } from "../../public/zustand"
import { getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { dataBase } from "../firebaseConfig"
import { doc } from "firebase/firestore"
import { useChatStore } from "../useChatStor"

export const LeftChats=()=>{
    const[userChats,setUserChats]=useState([])
    const [count,setCount]=useState(0)
    const [previosChat,setPreviosChat]=useState("")
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
    let state=false
    
    const openChat= async (chat)=>{

       const updatedUserChats=userChats.map((item)=>{
            const {user, ...otherData}=item
            return otherData
       })
       
       const index=updatedUserChats.findIndex(c=>c.chatId==chat.chatId)
       const docRef=doc(dataBase,"userChats",currentUser.id)
        try{
            updatedUserChats[index].seen=true
            await updateDoc(docRef,{
                chats:updatedUserChats
            })

        if(chat.chatId==previosChat){
            console.log(count)
            if(count<1){
                state=false
                setCount(1)
                console.log("count icreased")                
            }else{
                setCount(0)
                state=true
            }
            
        }else{
            state=true
        }
        
        setPreviosChat(chat.chatId)
        displayChat(chat.chatId,chat.user)
        openTheChat(state)
        
        }catch(err){
            console.log(err)
        }
    }
    

    return(
        <div className="w-full  h-[76%] overflow-y-scroll  pt-5" style={{scrollbarWidth:"none", msOverflowStyle:"none"}}>
             {userChats.map((chat)=>{
                
                return(
                    <div key={chat.chatId} className={chat.seen?"left-chat":"left-chat bg-blue-400"} onClick={()=>{openChat(chat)}}>
                        <img src={chat.user.profilePicUrl||"./src/assets/imgs/avatar.png"} alt="" className="w-9 h-9  object-cover rounded-full" />
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