import { useUserStore } from "../../public/zustand"
export const UserLeft =()=>{
    const {currentUser}=useUserStore()
    return(
        <div className="flex   justify-between items-center py-3">
            <img src={currentUser.profilePicUrl||"./src/assets/imgs/avatar.png"}   className="w-9 h-9 cursor-pointer rounded-full object-cover"/>
            <p className="text-white  text-[16px] cursor-pointer">{currentUser.userName}</p>
            <div className="flex ">
                <img src="./src/assets/imgs/more.png" alt=""  className="left-user-png"/>
                <img src="./src/assets/imgs/video.png" alt=""  className="left-user-png"/>
                <img src="./src/assets/imgs/edit.png" alt=""  className="left-user-png"/>


            </div>
        </div>
    )
}