import { toast } from "react-toastify"
import { storage } from "./firebaseConfig"
import { getDownloadURL, ref , uploadBytesResumable } from "firebase/storage"

export const Upload=async (file)=>{
    const date=new Date()
    const storageRef= ref(storage,`images/${date+file.name}`)
    
    const uploadTask=uploadBytesResumable(storageRef,file)

    return new Promise((resolve, reject) => {
        uploadTask.on("state_changed",
            null,
            (err)=>{
                reject(err.code)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((donwloadUrl)=>{
                    resolve(donwloadUrl)
                })
            }
        )
    })
}   