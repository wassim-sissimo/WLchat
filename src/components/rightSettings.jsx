import { auth } from "../firebaseConfig"
export const RightSeting=()=>{
    return(
        <div>
            <div className="flex justify-between p-2 px-4  items-center">
                <p className="text-white capitalize">chat settings</p>
                <div className="bg-inbg rounded-full w-5 h-5 cursor-pointer">
                    <img src="/arrowDown.png " alt=""  className="scale-[0.3]" />
                </div>
            </div>
            <div className="flex justify-between p-2 px-4  items-center">
                <p className="text-white capitalize">privacy & help</p>
                <div className="bg-inbg rounded-full w-5 h-5 cursor-pointer">
                    <img src="/arrowDown.png " alt=""  className="scale-[0.3]" />
                </div>
            </div>
            <div className="w-full p-2 px-4 ">
                <p className="text-white capitalize">shared photos</p>
                <ul className="w-full  h-[210px] overflow-y-scroll" style={{scrollbarWidth:"none", msOverflowStyle:"none"}}>
                    <li className="flex py-3 justify-between items-center cursor-auto ">
                        <img src="/avatar.png" alt="" className="w-8 h-8 object-cover rounded-lg"/>
                        <p className="text-white text-[15px] font-light">photo-2024.png</p>
                        <div className="w-5 h-5 p-1 rounded-full cursor-pointer bg-inbg">
                            <img src="/download.png" alt="" />
                        </div>
                    </li>
                    <li className="flex py-3 justify-between items-center cursor-auto ">
                        <img src="/avatar.png" alt="" className="w-8 h-8 object-cover rounded-lg"/>
                        <p className="text-white text-[15px] font-light">photo-2024.png</p>
                        <div className="w-5 h-5 p-1 rounded-full cursor-pointer bg-inbg">
                            <img src="/download.png" alt="" />
                        </div>
                    </li>
                    <li className="flex py-3 justify-between items-center cursor-auto ">
                        <img src="/avatar.png" alt="" className="w-8 h-8 object-cover rounded-lg"/>
                        <p className="text-white text-[15px] font-light">photo-2024.png</p>
                        <div className="w-5 h-5 p-1 rounded-full cursor-pointer bg-inbg">
                            <img src="/download.png" alt="" />
                        </div>
                    </li>
                    <li className="flex py-3 justify-between items-center cursor-auto ">
                        <img src="/avatar.png" alt="" className="w-8 h-8 object-cover rounded-lg"/>
                        <p className="text-white text-[15px] font-light">photo-2024.png</p>
                        <div className="w-5 h-5 p-1 rounded-full cursor-pointer bg-inbg">
                            <img src="/download.png" alt="" />
                        </div>
                    </li>
                    <li className="flex py-3 justify-between items-center cursor-auto ">
                        <img src="/avatar.png" alt="" className="w-8 h-8 object-cover rounded-lg"/>
                        <p className="text-white text-[15px] font-light">photo-2024.png</p>
                        <div className="w-5 h-5 p-1 rounded-full cursor-pointer bg-inbg">
                            <img src="/download.png" alt="" />
                        </div>
                    </li>
                </ul>

                <button className="bg-[rgba(243,44,44,0.7)] rounded-md mb-2 mt-3 py-1 w-full text-white hover:bg-[rgba(243,44,44,0.9)] transition duration-[.3s]">block user</button>
                <br />
                <button className="bg-[rgba(87,107,218,0.7)]  py-1 w-full text-white hover:bg-[rgba(87,107,218,1)] transition duration-[.3s] rounded-md"  onClick={()=>auth.signOut()}>log out</button>
            </div>
        </div>
    )
}