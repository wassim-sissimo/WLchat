import { doc, onSnapshot } from "firebase/firestore"
import { useRef, useState } from "react"

import { useEffect } from "react"
import { dataBase } from "../firebaseConfig"
import { useChatStore } from "../useChatStor"
import { useUserStore } from "../../public/zustand"

export const    ChatMiddel=()=>{
    const scrollRef=useRef(null)
    const {chatId,user}=useChatStore()
    const {currentUser}=useUserStore()
    const [chat,setChat]=useState()

   

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    },[])

    useEffect(()=>{
        if( chatId!=null){
        const fetchChat=onSnapshot(doc(dataBase,"chats",chatId), (res)=>{
           setChat(res.data())
           
        })
    
        return()=>{
            fetchChat()
         }
        }
    },[chatId])
   
   
    return(

        <div className="flex flex-col flex-[1]  overflow-y-scroll " style={{scrollbarWidth:"none",msOverflowStyle:"none"}}>
           
             {chat?.messages?.map((message,index)=>{
                 console.log(message.key)
               
                return (
                <>

                {!message.img && <div key={message.key} className={message.senderId==currentUser.id ?"flex py-2 space-x-5  justify-end  ":"flex py-2 space-x-5    "}>
                   {message.senderId!=currentUser.id && <img src={user?.profilePicUrl || "/avatar.png"} alt="" className="w-[40px] h-[40px]  object-cover rounded-full" />}
                    <div className="max-w-[70%] " >
                        <p className={message.senderId==currentUser.id?"text-white  bg-blue-600 p-3 rounded-lg ":"text-white  bg-neutral-600 p-3 rounded-lg "}>{message.text}  </p>
                        <p className="text-white font-light text-[12px] mt-1">{message.sentAt}</p>
                    </div>
                </div>}
                {message.img && <div key={index} className={message.senderId==currentUser.id?" flex flex-col  items-end py-3":"py-3"}><img src={message.img } className="max-w-[70%] rounded-md object-cover"/> <span className="text-white">{message.sentAt}</span> </div>}
                </>
                )
            })} 
            
        


            
            <div ref={scrollRef}></div>
        </div>
    )
}