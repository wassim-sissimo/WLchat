import { useChatStore } from "../useChatStor"
import avatar from "../assets/imgs/avatar.png"
export const UserRight=()=>{
    const {user}=useChatStore()
    if(user){

   
        return(
        <div className="border-b border-bColor flex flex-col items-center py-3">
            <img src={user?.profilePicUrl  || avatar} alt=""  className="w-12 h-12 object-cover rounded-full"/>
            <p className="text-white font-semibold text-[20px]">{user?.userName}</p>
            <p className="text-white font-light">Lorem ipsum dolor </p>

        </div>
    )
    }   
}