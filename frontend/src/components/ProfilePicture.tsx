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
        fetch("/update/s3Url",{
            method: "GET"
        })
        .then(result=>result.json())
            .then(result => {
                console.log(result)
                setIsLoading(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])
    
    const putDataOnS3 = async () => {
        const file = document.querySelector("input").files[0]
        const { url } = await fetch("/update/s3Url")
            .then(res => res.json())

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: file
        })

        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
    }

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
                                    <form>
                                        <input type="file" name="profileImage" id="" />
                                        <br /><br />
                                        <IonButton onClick={putDataOnS3} color="primary">Upload picture</IonButton>
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