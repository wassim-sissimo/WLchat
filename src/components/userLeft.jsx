import { useUserStore } from "../../public/zustand"
import more from "../assets/imgs/more.png"
import video from "../assets/imgs/video.png"
import edit from "../assets/imgs/edit.png"
export const UserLeft =()=>{
    const {currentUser}=useUserStore()
    return(
        <div className="flex   justify-between items-center py-3">
            <img src={currentUser.profilePicUrl||"./src/assets/imgs/avatar.png"}   className="w-9 h-9 cursor-pointer rounded-full object-cover"/>
            <p className="text-white  text-[16px] cursor-pointer">{currentUser.userName}</p>
            <div className="flex ">
                <img src={more}alt=""  className="left-user-png"/>
                <img src={video} alt=""  className="left-user-png"/>
                <img src={edit} alt=""  className="left-user-png"/>


            </div>
        </div>
    )
}