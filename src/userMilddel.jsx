import { useChatStore } from "./useChatStor"

export const UserMiddel=()=>{
    const {user}=useChatStore()
    return(
        <div className="py-3 border-b border-bColor px-2 flex justify-between">
            <div className="flex space-x-4">
                <img src={user?.profilePicUrl || "./src/assets/imgs/avatar.png"} alt=""  className="w-9 h-9 object-cover rounded-full"/>
                <div> 
                    <p className="text-white font-semibold">{user?.userName}</p>
                    <p className="text-white font-light text-[13px]">Lorem ipsum, dolor sit</p>
                </div>
            </div>
            <div className="flex">
                <img src="./src/assets/imgs/phone.png" alt=""  className="scale-[0.45]"/>
                <img src="./src/assets/imgs/video.png" alt=""  className="scale-[0.45]"/>
                <img src="./src/assets/imgs/info.png" alt="" className="scale-[0.45]"/>
            </div>
        </div>
    )
}