import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonToast, IonToggle } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const ProfilePrivacy: React.FC<{ setModal: Function }>=(props)=>{
    const [privacy,setPrivacy]=React.useState(false)
    const [toastSuccess,setToastSuccess]=React.useState(false)
    const [toastError,setToastError]=React.useState(false)
    const [toastErrorText,setToastErrorText]=React.useState("")

    React.useEffect(()=>{
        fetch("/profile/privacy",{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            setPrivacy(result.user.isPrivate)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const update=()=>{
        fetch(`/profile/profileprivacy/${privacy}`,{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            if (result.stato==="success") setToastSuccess(true)
            else{
                setToastErrorText("Something went wrong. Try again later")
                setToastError(true)
            }
        })
        .catch(err=>{
            console.log(err)
            setToastErrorText("Something went wrong. Try again later")
            setToastError(true)
        })
    }

    return(
        <IonPage>
            <BTHeaderModal title="Profile privacy" setModal={props.setModal} />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel>Private profile</IonLabel>
                                <IonToggle checked={privacy} onIonChange={(e)=>setPrivacy(e.detail.checked)} slot="end"></IonToggle>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton color="primary" expand="block" onClick={()=>update()}>Save</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton color="light" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonToast
                    isOpen={toastSuccess}
                    onDidDismiss={()=>setToastSuccess(false)}
                    duration={2000}
                    color="success"
                    header="Success!"
                    message="Your preferences have been updated!"
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

export default ProfilePrivacy