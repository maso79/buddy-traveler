const server_fetch=async (endpoint: string, method: string, body: BodyInit)=>{
    if (method === "GET"){
        try{
            const request=await fetch(endpoint,{
                method,
                
            })
            const result=await request.json()
            if (result.stato === true) return true
            if (result.stato === false) return false
            return result.stato
        }
        catch(e){
            console.log(e)
        }
    }
    else{
        try{
            const request=await fetch(endpoint,{
                method,
                
                headers:{
                    "Content-Type": "Application/JSON"
                },
                body
            })
            const result=await request.json()
            if (result.stato === true) return true
            if (result.stato === false) return false
            return result.stato
        }
        catch(e){
            console.log(e)
        }
    }
}

export default server_fetch