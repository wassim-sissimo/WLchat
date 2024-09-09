import { LeftChats } from "./leftChats"
import { LeftSaerchAndAdd } from "./leftSearchAndAdd"
import { UserLeft } from "./userLeft"

export const Left =()=>{
    return(
        <div className=" flex-[1] border border-right border-bColor">
            <UserLeft/>
            <LeftSaerchAndAdd/>
            <LeftChats/>
        </div>
    )
}