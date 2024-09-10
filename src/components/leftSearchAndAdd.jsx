import { useState } from "react"
import { AddUser } from "./addUser"

export const LeftSaerchAndAdd=()=>{
    const [add,setAdd]=useState(false)
    const togel=()=>{
        setAdd((current)=>!current)
    }
 return(
    <div className="w-full pb-5 pt-2 px-2 flex space-x-1">
        <div className="flex space-x-1 items-center bg-inbg rounded-md py-1 px-2">
            <img src="./src/assets/imgs/search.png" alt="" className="w-4 h-4 object-cover " />
            <input type="text" placeholder="search" className="flex-[1] border-none bg-transparent outline-none text-white" />
        </div>
        <div className="bg-inbg rounded-lg cursor-pointer" onClick={togel}>
            <img src={add?"./src/assets/imgs/minus.png":"./src/assets/imgs/plus.png"} alt=""  className="scale-[0.4]"/>
        </div>
        {add && <AddUser/> }
        
    </div>
 )
}