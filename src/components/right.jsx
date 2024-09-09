import { RightSeting } from "./rightSettings"
import { UserRight } from "./userRight"

export const Right =()=>{
    return(
        <div className="flex-[1]">
           <UserRight/>
           <RightSeting/>
        </div>
    )
}