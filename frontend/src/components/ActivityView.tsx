import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonModal, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import { calendar, camera, location, pencil, trash } from 'ionicons/icons';
import * as React from 'react';
import ActivityUploadPicture from './ActivityUploadPicture';
import BTHeaderModal from './BTHeaderModal';

const ActivityView: React.FC<{ setModal: Function, activityId: String, activityName: String }>=(props)=>{
    const [activity,setActivity]=React.useState({
        date: "",
        description: "",
        name: "",
        place: "",
        time: ""
    })
    const [caricamento,setCaricamento]=React.useState(true)
    const [modalPictures,setModalPictures]=React.useState(-1)

    React.useEffect(()=>{
        fetch(`/activity/getone/${props.activityId}`,{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            setActivity(result.data)
            setCaricamento(false)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <IonPage>
            <BTHeaderModal setModal={props.setModal} title={"View your activity"} />
            <IonContent>
                {
                    caricamento === true &&
                    <IonGrid className="landing-half">
                        <IonRow>
                            <IonCol size="12" className="text-center">
                                <IonSpinner name="crescent" /><br />
                                <IonText>Loading {props.activityName}</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
                {
                    caricamento === false &&
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonText>
                                    <h1>{props.activityName}</h1>
                                </IonText>
                            </IonCol>
                            <IonCol size="12">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Summary</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonText>
                                            <IonIcon className="padding-right-minimum" icon={location} />
                                            {activity.place}
                                        </IonText>
                                        <br />
                                        <IonText>
                                            <IonIcon className="padding-right-minimum" icon={calendar} />
                                            {new Date(activity.date).toLocaleDateString()}, {new Date(activity.time).toLocaleTimeString()}
                                        </IonText>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Description
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonText>
                                            {activity.description}
                                        </IonText>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Gallery
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonContent>
                                        
                                    </IonContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Actions
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="3">
                                                    <IonButton color="light">
                                                        <IonIcon icon={pencil} className="padding-right-minimum" />
                                                    </IonButton>
                                                </IonCol>
                                                <IonCol size="3">
                                                    <IonButton color="light">
                                                        <IonIcon icon={trash} className="padding-right-minimum" />
                                                    </IonButton>
                                                </IonCol>
                                                <IonCol size="3">
                                                    <IonButton color="light" onClick={()=>setModalPictures(0)}>
                                                        <IonIcon icon={camera} className="padding-right-minimum" />
                                                    </IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCardContent>
                                </IonCard> 
                            </IonCol> 
                        </IonRow>    
                    </IonGrid>

                }
                <IonModal isOpen={modalPictures===0}>
                    <ActivityUploadPicture setModal={setModalPictures} activityId={""+props.activityId} />
                </IonModal>
            </IonContent>
        </IonPage>
    )
}

export default ActivityView