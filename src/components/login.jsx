import { CreateAnAcount } from "./createAnAcount"
import { WelcomeBack } from "./welcomeBack"

export const LogIn=()=>{
    return(
        <div className="w-full h-full flex justify-around items-center xs:flex-col ">
            <WelcomeBack/>
            <div className="w-[2px] xs:w-[80%] rounded-lg h-[80%] xs:h-[2px] bg-bColor "></div>
            <CreateAnAcount/>
        </div>
    )
}