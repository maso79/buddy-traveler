import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSpinner, IonText, IonToast } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const ProfilePersonalInfo: React.FC<{ setModal: Function }>=(props)=>{
    const [name,setName]=React.useState("")
    const [surname,setSurname]=React.useState("")
    const [username,setUsername]=React.useState("")
    const [toastSuccess,setToastSuccess]=React.useState(false)
    const [toastError,setToastError]=React.useState(false)
    const [toastErrorText,setToastErrorText]=React.useState("")
    const [isLoading,setIsLoading]=React.useState(true)

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
                setIsLoading(false)
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
            <BTHeaderModal title="Change your personal information" setModal={props.setModal} />
            <IonContent>
                {
                    isLoading === true &&
                    <IonGrid className="landing-half">
                        <IonRow>
                            <IonCol size="12" className="text-center">
                                <IonSpinner name="crescent" /><br />
                                <IonText>Loading your data...</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
                {
                    isLoading === false &&
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonItem>
                                    <IonLabel position="floating">Your name</IonLabel>
                                    <IonInput value={name} onIonChange={e=>setName(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12">
                                <IonItem>
                                    <IonLabel position="floating">Your surname</IonLabel>
                                    <IonInput value={surname} onIonChange={e=>setSurname(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12">
                                <IonItem>
                                    <IonLabel position="floating">Your username</IonLabel>
                                    <IonInput value={username} onIonChange={e=>setUsername(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12">
                                <br />
                                <IonButton color="primary" expand="block" onClick={update}>Update info</IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonButton color="primary" fill="clear" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
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

export default ProfilePersonalInfo