import { useChatStore } from "../useChatStor"
import { RightSeting } from "./rightSettings"
import { UserRight } from "./userRight"

export const Right =()=>{
    
    return(
        <div className={`flex-[1] relative `}>
           <UserRight/>
           <RightSeting/>
        </div>
    )
}