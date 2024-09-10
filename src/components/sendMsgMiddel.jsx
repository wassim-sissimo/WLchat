import EmojiPicker from "emoji-picker-react"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { dataBase } from "../firebaseConfig"
import { useChatStore } from "../useChatStor"
import { useUserStore } from "../../public/zustand"
import { toast } from "react-toastify"
import { Upload } from "../upload"
export const SendMsgMiddel=()=>{ 
    const [emojiOpen,setEmojiOpen]=useState(false)
    const [text,setText]=useState("")
    const {chatId,user}=useChatStore()
    const {currentUser}=useUserStore()
    const [sentImg,setSentImg]=useState({
        file:null,
        url:""
    })
    
    const handelEmojiClick=(e)=>{
        setText((current)=>current+e.emoji)
    }


    const handelSend=async ()=>{
        const currentTime=new Date()
        const hours=currentTime.getHours()
        const minutes=currentTime.getMinutes()
        const sentAt = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

        const chatsRef=doc(dataBase,"chats",chatId)
       
        try{ 
            
            const chatSnap=await getDoc(chatsRef)
            if(text!=""){
                if(chatSnap.exists() ){
                    const currentMessages=chatSnap.data().messages || []
                    const updatedMessages=[...currentMessages,{
                        senderId:currentUser.id,
                        text,
                        sentAt,
                        key:Date.now()
                    }
                
                    ]
                    await updateDoc(chatsRef,{
                        messages:updatedMessages
                    })
                
                toast.success('message sent')

                
             }
            
                const ids=[currentUser.id,user.id]
                ids.map(async id=>{
                    const usreChatsRef= doc(dataBase,"userChats",id)
                    const userChatsSnap=await getDoc(usreChatsRef)
                    if(userChatsSnap.exists()){
                    const chats=userChatsSnap.data().chats
                    const chatIndex=chats.findIndex(c=>c.chatId==chatId)
                    chats[chatIndex].lastMessage=text
                    chats[chatIndex].seen=id==currentUser.id?true:false
                    chats[chatIndex].updatedAt=Date.now()
                    console.log(chats[chatIndex])

                    await updateDoc(usreChatsRef,{
                        chats:chats
                    })
                    console.log("ur message is updated")
                }
                })
                
                

             setText('')
            
         }else{
            
            if(sentImg.file){
                
                let imgUrl=await Upload(sentImg.file)
                if(chatSnap.exists() ){
                    console.log("ur image is sent")
                    const currentMessages=chatSnap.data().messages || []
                    const updatedMessages=[...currentMessages,{
                        senderId:currentUser.id,
                        
                        sentAt,
                        key:new Date(),
                        ...(imgUrl && {img:imgUrl})
                    }
                
                    ]
                    await updateDoc(chatsRef,{
                        messages:updatedMessages
                    })
                    

                }

                const ids=[currentUser.id,user.id]
                ids.map(async id=>{
                    const usreChatsRef= doc(dataBase,"userChats",id)
                    const userChatsSnap=await getDoc(usreChatsRef)
                    if(userChatsSnap.exists()){
                    const chats=userChatsSnap.data().chats
                    const chatIndex=chats.findIndex(c=>c.chatId==chatId)
                    chats[chatIndex].lastMessage="photo"
                    chats[chatIndex].seen=id==currentUser.id?true:false
                    chats[chatIndex].updatedAt=Date.now()
                    console.log(chats[chatIndex])

                    await updateDoc(usreChatsRef,{
                        chats:chats
                    })
                    setSentImg({
                        file:null,
                        url:"",
                    })
                    console.log("ur message is updated")
                }
                })
                
                
            }
         }
            
            

        }catch(err){
            console.log(err)
         }

        
    }

    const handelImg=(e)=>{
        if(e.target.files[0]){
            setSentImg({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
        
    }
    return(
        <div className="border-t border-bColor py-3 px-2 flex">
            <div className="flex">
                <label htmlFor="img">
                <img src="./src/assets/imgs/img.png" alt="" className="scale-[0.45] cursor-pointer" />
                </label>
                
                <input type="file"  className="hidden" id="img" onChange={handelImg}/>
                <img src="./src/assets/imgs/camera.png" alt="" className="scale-[0.45]" />
                <img src="./src/assets/imgs/mic.png" alt="" className="scale-[0.45]" />
            </div>
            <input value={text} type="text" placeholder="type your msg .." className="flex-[1] px-2 rounded-lg bg-inbg text-white outline-none"  onChange={(e)=>{setText(e.target.value)}} />
            <div className="relative">
                <img src="./src/assets/imgs/emoji.png" alt=""  className="scale-[0.45] cursor-pointer" onClick={()=>{setEmojiOpen((current)=>!current)}}/>
                <div className="absolute  bottom-[100%] right-0  ">
                 <EmojiPicker  open={emojiOpen} onEmojiClick={handelEmojiClick}/>
                </div> 
                
            </div>
            <button className="capitalize py-1 px-2 text-white bg-blue-600 rounded-lg cursor-pointer" onClick={handelSend}>send</button>
        </div>
    )
}