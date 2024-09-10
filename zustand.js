import { create } from "zustand";
import { getDoc ,doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { dataBase } from "../src/firebaseConfig";

export const useUserStore=create((set)=>({
    currentUser:null,
    isLoading:true,
    fetchUser:async (uid)=>{
        if(uid==null) { set({currentUser:null,isLoading:false})}

        try{
            const docRef=doc(dataBase,"user",uid)
            const res=await getDoc(docRef)
            
            if(res.exists()){
                set({currentUser:res.data(),isLoading:false})
            }else{
                set({currentUser:null,isLoading:false})
            }

        }catch(err){
            set({currentUser:null,isLoading:false})
            console.log(err)
           
            
        }
    }
}))