import { useChatStore } from "../useChatStor"
import { LeftChats } from "./leftChats"
import { LeftSaerchAndAdd } from "./leftSearchAndAdd"
import { UserLeft } from "./userLeft"

export const Left =()=>{
    const {chatOpen}=useChatStore()
   
    return(
        <div className={`flex-[1] border border-right border-bColor ${chatOpen?"xs:hidden":""  } `}>
            <UserLeft/>
            <LeftSaerchAndAdd/>
            <LeftChats/>
        </div>
    )
}