import { useChatStore } from "./useChatStor"
import avatar from "./assets/imgs/avatar.png"

import { ArrowLeft } from "lucide-react"
import { Info } from "lucide-react"


export const UserMiddel=()=>{
    const {user,openTheChat,openTHeInfo}=useChatStore()
   
    const handelBack=()=>{
        openTheChat(false)
    }
   const handelInfo=()=>{
        openTHeInfo(true)
        openTheChat(false)
   }
    return(
        <div className="py-3 border-b border-bColor px-2 flex justify-between">
            <div className="flex space-x-4">
                <img src={user?.profilePicUrl || avatar} alt=""  className="w-9 h-9 object-cover rounded-full"/>
                <div> 
                    <p className="text-white font-semibold">{user?.userName}</p>
                    <p className="text-white font-light text-[13px]">Lorem ipsum, dolor sit</p>
                </div>
            </div>
            <div className="flex items-center">
                
                <div onClick={handelBack}><ArrowLeft className="text-white cursor-pointer" /></div>
                <div className="text-white mx-3 cursor-pointer" onClick={handelInfo} ><Info /></div>
                
            </div>
        </div>
    )
}