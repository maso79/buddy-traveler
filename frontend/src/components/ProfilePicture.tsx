import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import { camera, cloudUpload, removeCircle } from 'ionicons/icons';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import placeholder_profile from '../pictures/placeholder-profile.png'

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
    const [path,setPath]=React.useState(placeholder_profile)
    const [isLoading,setIsLoading]=React.useState(true)
    const [alertUpload,setAlertUpload]=React.useState(false)
    const [uploading,setUploading]=React.useState(false)

    React.useEffect(() => {
        //qui è dove si dovrebbe fare la richiesta all'endpoint che restituisce l'immagine
        console.log("richiesta")
        retriveImage()
    }, [])
    
    const retriveImage = async () => {
        const { url } = await fetch("/update/profileimage")
            .then(res => res.json())
        
        if (url.url == "not found") {
            setIsLoading(false)            
           return
        }
        
        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
        
        setIsLoading(false)
    }

    const putDataOnS3 = async () => {
        setUploading(true)
        const file = document.querySelector("input").files[0]
        console.log(file)
        if (file != undefined || file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png") {
            if (file.size < 100000) {
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
                setUploading(false)
            } else {
                console.log("Seleziona un immagine piu piccola")
            }
        } else {
            console.log("Seleziona un immagine valida")
        }
        
    }

    const removeImage = async () => {
        await fetch("/update/removeimage")
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
                                    {
                                        uploading === true &&
                                        <IonGrid className="landing-half">
                                        <IonRow>
                                            <IonCol size="12" className="text-center">
                                                <IonSpinner name="crescent" /><br />
                                                <IonText>Uploading picture...</IonText>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                    }
                                    {
                                        uploading === false &&
                                        <IonImg src={path} alt="picture"/>
                                    }
                                </IonCol>
                                <IonCol size="12" className="text-center">
                                    <IonText>Choose a picture</IonText>
                                    <br /><br />
                                    <form>
                                        <input type="file" name="profileImage" id="" onChange={putDataOnS3} />
                                        <br /><br />
                                    </form>
                                </IonCol>
                                <IonCol size="12">
                                    <IonItemDivider>
                                        <IonLabel>Or</IonLabel>
                                    </IonItemDivider>
                                </IonCol>
                                <IonCol size="12">
                                    <IonButton color="light" expand="block">
                                        <IonIcon slot="start" icon={camera} />
                                        <IonText>Take picture</IonText>
                                    </IonButton>
                                </IonCol>
                                <IonCol size="12">
                                    <IonButton color="light" expand="block" onClick={removeImage}>
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