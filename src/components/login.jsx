import { CreateAnAcount } from "./createAnAcount"
import { WelcomeBack } from "./welcomeBack"

export const LogIn=()=>{
    return(
        <div className="w-full h-full flex justify-around items-center">
            <WelcomeBack/>
            <div className="w-[2px] rounded-lg h-[80%] bg-bColor"></div>
            <CreateAnAcount/>
        </div>
    )
}