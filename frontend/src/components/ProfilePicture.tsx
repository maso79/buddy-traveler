import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import { camera, cloudUpload, removeCircle } from 'ionicons/icons';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const options=[
    {
        text: "Submit a picture",
        icon: cloudUpload
    },
    {
        text: "Take a new picture",
        icon: camera
    },
    {
        text: "Remove picture",
        icon: removeCircle
    },
]

const ProfilePictures: React.FC<{ setModal: Function }>=(props)=>{
    const [path,setPath]=React.useState("")
    const [isLoading,setIsLoading]=React.useState(true)
    const [alertUpload,setAlertUpload]=React.useState(false)

    React.useEffect(()=>{
        console.log("richiesta")
        fetch("/profile/picture",{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            //FIXME: problema della ricezione foto
            console.log(result)
            if (result.stato === "no data"){
                setPath("https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg")
                setIsLoading(false)
            }
            else{
                setPath("/backend/uploads/"+result.data)
                setIsLoading(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <IonPage>
            <BTHeaderModal title="Update your profile picture" setModal={props.setModal} />
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
                    <>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6" offset="3">
                                    <IonImg src={path} />
                                </IonCol>
                                <IonCol size="12" className="text-center">
                                    <IonText>Choose a picture</IonText>
                                    <br /><br />
                                    <form action="/update/profileimage" method="post" encType="multipart/form-data">
                                        <input type="file" name="profileImage" id="" />
                                        <br /><br />
                                        <IonButton type="submit" color="primary">Upload picture</IonButton>
                                    </form>
                                </IonCol>
                                <IonCol size="12">
                                    <IonItemDivider>
                                        <IonLabel>Or</IonLabel>
                                    </IonItemDivider>
                                </IonCol>
                                <IonCol size="6">
                                    <IonButton color="secondary" expand="block">
                                        <IonIcon slot="start" icon={camera} />
                                        <IonText>Take picture</IonText>
                                    </IonButton>
                                </IonCol>
                                <IonCol size="6">
                                    <IonButton color="tertiary" expand="block">
                                        <IonIcon slot="start" icon={removeCircle} />
                                        <IonText>Remove</IonText>
                                    </IonButton>
                                </IonCol>
                                <IonCol size="12">
                                    <br /><br />
                                    <IonButton color="light" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default ProfilePictures