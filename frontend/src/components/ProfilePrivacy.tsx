import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSpinner, IonText, IonToast, IonToggle } from '@ionic/react';
import * as React from 'react';
import serverFetchNative from '../logic/serverFetchNative';
import BTHeaderModal from './BTHeaderModal';

const ProfilePrivacy: React.FC<{ setModal: Function }>=(props)=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [privacy,setPrivacy]=React.useState(false)
    const [toastSuccess,setToastSuccess]=React.useState(false)
    const [toastError,setToastError]=React.useState(false)
    const [toastErrorText,setToastErrorText]=React.useState("")

    const profilePrivacy = async () => {
        const result = await serverFetchNative("/profile/privacy", "GET", JSON.stringify({}))
        console.log(result)
        setPrivacy(result.user.isPrivate)
        setIsLoading(false)
    }

    React.useEffect(()=>{
        // fetch("/profile/privacy",{
        //     method: "GET"
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     console.log(result)
        //     setPrivacy(result.user.isPrivate)
        //     setIsLoading(false)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
        profilePrivacy()
    },[])

    const update = async () => {
        
        try {
            const result = await serverFetchNative(`/profile/profileprivacy/${privacy}`, "GET", JSON.stringify({}))
            console.log(result)
            if (result.stato === "success") setToastSuccess(true)
            else {
                setToastErrorText("Something went wrong. Try again later")
                setToastError(true)
            }
        } catch (err) {
            console.log(err)
            setToastErrorText("Something went wrong. Try again later")
            setToastError(true)
        }

        // fetch(`/profile/profileprivacy/${privacy}`,{
        //     method: "GET"
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     console.log(result)
        //     if (result.stato==="success") setToastSuccess(true)
        //     else{
        //         setToastErrorText("Something went wrong. Try again later")
        //         setToastError(true)
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        //     setToastErrorText("Something went wrong. Try again later")
        //     setToastError(true)
        // })
    }

    return(
        <IonPage>
            <BTHeaderModal title="Profile privacy" setModal={props.setModal} />
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
                                    <IonLabel>Private profile</IonLabel>
                                    <IonToggle checked={privacy} onIonChange={(e)=>setPrivacy(e.detail.checked)} slot="end"></IonToggle>
                                </IonItem>
                            </IonCol>
                            <IonCol size="12">
                                <IonText className='text-muted'>
                                    What is this going to affect?
                                    {
                                        privacy === true &&
                                        <ul>
                                            <li>Your profile: only the people you allow are going to be able to see the details about you and your diaries</li>
                                            <li>Your diaries: they are going to be private, and they won't be public unless your profile is public. You can still share them with some selected people</li>
                                        </ul>
                                    }
                                    {
                                        privacy === false &&
                                        <ul>
                                            <li>Your profile: everyone is going to be able to see the details about you and your diaries</li>
                                            <li>Your diaries: they are going to be public by default. You may set them private in any moment.</li>
                                        </ul>
                                    }
                                </IonText>
                            </IonCol>
                            <IonCol size="12">
                                <IonButton color="primary" expand="block" onClick={()=>update()}>Save</IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonButton color="light" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
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