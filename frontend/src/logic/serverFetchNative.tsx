import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import getServerBaseURL from './getServerBaseURL';

const serverFetchNative=async (endpoint: string, method: string, body: BodyInit)=>{
    if (method==="POST"){
        try{
            const options: HttpOptions={
                url: getServerBaseURL()+endpoint,
                headers: {
                    "Content-Type": "Application/JSON",
                },
                webFetchExtra:{
                    credentials: "include"
                },
                data: body,
            }
    
            const response: HttpResponse=await CapacitorHttp.post(options)
            return response.data
        }
        catch(e){
            console.log(e)
            return new Promise(async(resolve,reject)=>{
                reject(false)
            })
        }
    }
    else{
        try{
            const options: HttpOptions={
                url: getServerBaseURL()+endpoint,
                webFetchExtra:{
                    credentials: "include"
                },
            }
    
            const response: HttpResponse=await CapacitorHttp.get(options)
            return await response.data
        }
        catch(e){
            console.log(e)
            return new Promise(async(resolve,reject)=>{
                reject(false)
            })
        }
    }
}

export default serverFetchNative