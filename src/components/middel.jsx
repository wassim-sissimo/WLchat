import { UserMiddel } from "../userMilddel"
import { ChatMiddel } from "./chatMiddel"
import { SendMsgMiddel } from "./sendMsgMiddel"

export const Middel =()=>{
    return(
        <div className="  flex-[2] flex flex-col border-r border-bColor">
           <UserMiddel/>
           <ChatMiddel/>
           <SendMsgMiddel/> 

        </div>
    )
}