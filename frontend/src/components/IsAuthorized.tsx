import * as React from 'react';
import { Redirect } from 'react-router';
import serverFetchNative from '../logic/serverFetchNative';

const IsAuthorized: React.FC=(props: any)=>{
    const [autorizzato,setAutorizzato]=React.useState(Boolean)

    const authorized = async () => {
        try {
            const result = await serverFetchNative("/auth/authorized", "GET", JSON.stringify({}))
            if (result.stato==true) {
                console.log("ok")
                setAutorizzato(true)
            }
            else {
                setAutorizzato(false)
            }
        } catch {
            setAutorizzato(false)
        }
    }

    React.useEffect(() => {
        authorized()
        // fetch("/auth/authorized",{
        //     method: "GET"
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     if (result.stato==true) {
        //         console.log("ok")
        //         setAutorizzato(true)
        //     }
        //     else {
        //         setAutorizzato(false)
        //     }
        // })
        // .catch(err=>{
        //     setAutorizzato(false)
        // })
    })

    return(
        <>
            {
                autorizzato === true &&
                props.children
            }
            {
                autorizzato === false &&
                <Redirect to="/disconnected" />
            }
        </>
    )
}

export default IsAuthorized