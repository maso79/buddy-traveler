import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonToast, IonToggle } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const ProfilePrivacy: React.FC<{ setModal: Function }>=(props)=>{
    const [name,setName]=React.useState("")
    const [surname,setSurname]=React.useState("")
    const [username,setUsername]=React.useState("")
    const [toastSuccess,setToastSuccess]=React.useState(false)
    const [toastError,setToastError]=React.useState(false)
    const [toastErrorText,setToastErrorText]=React.useState("")

    React.useEffect(()=>{
        fetch("/profile/all",{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            if (result.user.email){
                setName(result.user.name)
                setSurname(result.user.surname)
                setUsername(result.user.username)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const update=()=>{
        console.log(name)
        fetch("/update/userinfo",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                name,
                surname,
                username
            })
        })
        .then(result=>result.json())
        .then(result=>{
            if (result.stato==="success") setToastSuccess(true)
            else{
                setToastErrorText(result.stato)
                setToastError(true)
            }
        })
        .catch(err=>{
            setToastErrorText(err.stato)
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
                                <IonToggle slot="end"></IonToggle>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton color="primary" expand="block">Save</IonButton>
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
                    message="Your personal information was updated"
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