import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonToast } from '@ionic/react';
import * as React from 'react';
import serverFetchNative from '../logic/serverFetchNative';
import BTHeaderModal from './BTHeaderModal';

const ProfilePassword: React.FC<{ setModal: Function }>=(props)=>{
    const [password,setPassword]=React.useState("")
    const [confirmPassword,setConfirmPassword]=React.useState("")
    const [toastSuccess,setToastSuccess]=React.useState(false)
    const [toastError,setToastError]=React.useState(false)
    const [toastErrorText,setToastErrorText]=React.useState("")


    const update= async ()=>{
        try{
            if (password !== confirmPassword) throw new Error("Passwords don't match")

            try {
                const result = await serverFetchNative("/update/password", "POST", JSON.stringify({ password }))
                if (result.stato === "success") setToastSuccess(true)
                else {
                    setToastErrorText(result.stato)
                    setToastError(true)
                }
            } catch (err) {
                console.log(err)
                setToastErrorText(err.stato)
                setToastError(true)
            }

            // fetch("/update/password",{
            //     method: "POST",
            //     headers:{
            //         "Content-Type": "Application/JSON"
            //     },
            //     body: JSON.stringify({
            //         password
            //     })
            // })
            // .then(result=>result.json())
            // .then(result=>{
            //     if (result.stato === "success") setToastSuccess(true)
            //     else {
            //         setToastErrorText(result.stato)
            //         setToastError(true)
            //     }
            // })
            // .catch(err=>{
            //     console.log(err)
            //     setToastErrorText(err.stato)
            //     setToastError(true)
            // })
        }
        catch(e){
            console.log(e)
            setToastError(true)
            setToastErrorText("Passwords don't match")
        }
    }

    return(
        <IonPage>
            <BTHeaderModal title="Change your password" setModal={props.setModal} />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="floating">New password</IonLabel>
                                <IonInput type="password" value={password} onIonChange={e=>setPassword(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="floating">Confirm new password</IonLabel>
                                <IonInput type="password" value={confirmPassword} onIonChange={e=>setConfirmPassword(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <br />
                            <IonButton color="primary" expand="block" onClick={update}>Update password</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton color="primary" fill="clear" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonToast
                    isOpen={toastSuccess}
                    onDidDismiss={()=>setToastSuccess(false)}
                    duration={2000}
                    color="success"
                    header="Success!"
                    message="Your password was updated"
                />
                <IonToast
                    isOpen={toastError}
                    onDidDismiss={()=>setToastError(false)}
                    duration={2000}
                    color="danger"
                    header="Error"
                    message={toastErrorText}
                />
            </IonContent>
        </IonPage>
    )
}

export default ProfilePassword