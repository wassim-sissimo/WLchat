import { useChatStore } from "./useChatStor"
import avatar from "../assets/imgs/avatar.png"
import phone from "../assets/imgs/phone.png"
import video from "../assets/imgs/video.png"
import info from "../assets/imgs/info.png"

export const UserMiddel=()=>{
    const {user}=useChatStore()
    return(
        <div className="py-3 border-b border-bColor px-2 flex justify-between">
            <div className="flex space-x-4">
                <img src={user?.profilePicUrl || avatar} alt=""  className="w-9 h-9 object-cover rounded-full"/>
                <div> 
                    <p className="text-white font-semibold">{user?.userName}</p>
                    <p className="text-white font-light text-[13px]">Lorem ipsum, dolor sit</p>
                </div>
            </div>
            <div className="flex">
                <img src={phone} alt=""  className="scale-[0.45]"/>
                <img src={video} alt=""  className="scale-[0.45]"/>
                <img src={info} alt="" className="scale-[0.45]"/>
            </div>
        </div>
    )
}