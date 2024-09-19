import { useUserStore } from "../../public/zustand"
import more from "../assets/imgs/more.png"
import video from "../assets/imgs/video.png"
import edit from "../assets/imgs/edit.png"
import { useChatStore } from "../useChatStor"
import { auth } from "../firebaseConfig"
export const UserLeft =()=>{
    const {currentUser}=useUserStore()
    const {chatOpen}=useChatStore()
    return(
        <div className="flex justify-between items-center w-full  ">
            <div className={`flex   justify-between items-center py-3  ${chatOpen?"xl:w-full":" xs:50%"} `}>
            <img src={currentUser.profilePicUrl||"./src/assets/imgs/avatar.png"}   className="w-9 h-9 cursor-pointer rounded-full object-cover mx-2"/>
            <p className="text-white  text-[16px] cursor-pointer">{currentUser.userName}</p>
            <div className="flex ">
                <img src={more}alt=""  className="left-user-png"/>
                <img src={video} alt=""  className="left-user-png"/>
                <img src={edit} alt=""  className="left-user-png"/>


            </div>
            </div>
            <button className={`bg-[rgba(87,107,218,0.7)]  py-1 w-full text-white hover:bg-[rgba(87,107,218,1)] transition duration-[.3s] rounded-md mr-3 ${chatOpen?"hidden":"w-[35%]"}`}  onClick={()=>auth.signOut()}>log out</button>
        </div>
    )
}