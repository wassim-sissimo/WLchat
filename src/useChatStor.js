import { create } from "zustand";

import { useUserStore } from "../public/zustand";

export const useChatStore=create((set)=>({
    
    user:null,
    chatId:null,
    userIsBlocked:false,
    currentUserIsBlocked:false,
    chatOpen:false,
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

    changeBlock:()=>{
        set(state=>({...State,userIsBlocked:!state.userIsBlocked}))
    },

    openTheChat:()=>{
        set(state=>({...state,chatOpen:!state.chatOpen}))
    }


}))