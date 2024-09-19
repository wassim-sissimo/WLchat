import { create } from "zustand";

import { useUserStore } from "../public/zustand";

export const useChatStore=create((set)=>({
    
    user:null,
    chatId:null,
    userIsBlocked:false,
    currentUserIsBlocked:false,
    chatOpen:false,
    infoOpen:false,
    chatScrool:false,
   
    displayChat:(chatId,user)=>{
        const currentUser=useUserStore.getState().currentUser
        
        if(user.blocked.includes(currentUser.id)){
            set({
                user:null,
                chatId,
                userIsBlocked:false,
                currentUserIsBlocked:true,
            })
        }else if(currentUser.blocked.includes(user.id)){
            set({
                user,
                chatId,
                userIsBlocked:true,
                currentUserIsBlocked:false,
            })
        }else{
            
            set({
                user,
                chatId,
                userIsBlocked:false,
                currentUserIsBlocked:false,
            })

        }
    },
    openTheChat:(state)=>{
        set(current=>({...current,
                        chatOpen:state,
                        chatScrool:state
                    }))
    },
    openTHeInfo:(state)=>{
        set(now=>({...now,infoOpen:state}))
    }
}))