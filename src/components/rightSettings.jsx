import { auth } from "../firebaseConfig"
import { useChatStore } from "../useChatStor"
export const RightSeting=()=>{
    const {openTHeInfo,openTheChat}=useChatStore()
    const handelInfo=()=>{
        openTHeInfo(false)
        openTheChat(true)

    }
    return(
        <div className="px-3 mb-2 absolute bottom-0 w-full">
            
            
                <button className="bg-[rgba(78,184,78,0.7)] rounded-md mb-2 mt-3 py-1 w-full text-white hover:bg-[rgba(78,184,78,0.9)] transition duration-[.3s]" onClick={handelInfo} >close info</button>
                <br />
                <button className="bg-[rgba(243,44,44,0.7)] rounded-md mb-2  py-1 w-full text-white hover:bg-[rgba(243,44,44,0.9)] transition duration-[.3s]">block user</button>
                <br />
                <button className="bg-[rgba(87,107,218,0.7)]  py-1 w-full text-white hover:bg-[rgba(87,107,218,1)] transition duration-[.3s] rounded-md"  onClick={()=>auth.signOut()}>log out</button>
            
        </div>
    )
}