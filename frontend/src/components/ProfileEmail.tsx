import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSpinner, IonText, IonToast } from '@ionic/react';
import * as React from 'react';
import serverFetchNative from '../logic/serverFetchNative';
import BTHeaderModal from './BTHeaderModal';

const ProfileEmail: React.FC<{ setModal: Function }>=(props)=>{
    const [email,setEmail]=React.useState("")
    const [toastSuccess,setToastSuccess]=React.useState(false)
    const [toastError,setToastError]=React.useState(false)
    const [toastErrorText,setToastErrorText]=React.useState("")
    const [isLoading,setIsLoading]=React.useState(true)

    const profileEmail = async () => {
        const result = await serverFetchNative("/profile/email", "GET", JSON.stringify({}))
        if (result.user.email){
            setEmail(result.user.email)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        profileEmail()
        // fetch("/profile/email",{
        //     method: "GET"
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     if (result.user.email){
        //         setEmail(result.user.email)
        //         setIsLoading(false)
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },[])

    const update = async () => {
        try {
            const result = await serverFetchNative("/update/email", "POST", JSON.stringify({ email }))
            if (result.stato==="success") setToastSuccess(true)
            else{
                setToastErrorText(result.stato)
                setToastError(true)
            }
        } catch (err) {
            setToastErrorText(err.stato)
            setToastError(true)
        }
        // fetch("/update/email",{
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({
        //         email,
        //     })
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     if (result.stato==="success") setToastSuccess(true)
        //     else{
        //         setToastErrorText(result.stato)
        //         setToastError(true)
        //     }
        // })
        // .catch(err=>{
        //     setToastErrorText(err.stato)
        //     setToastError(true)
        // })
    }

    return(
        <IonPage>
            <BTHeaderModal title="Change your email" setModal={props.setModal} />
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
                                    <IonLabel position="floating">Your email</IonLabel>
                                    <IonInput value={email} onIonChange={e=>setEmail(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12">
                                <IonText className="text-muted spazio-lato">You'll be asked to verify your new email</IonText>
                            </IonCol>
                            <IonCol size="12">
                                <br />
                                <IonButton color="primary" expand="block" onClick={update}>Update email</IonButton>
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
                    message="Your email was updated"
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

export default ProfileEmail