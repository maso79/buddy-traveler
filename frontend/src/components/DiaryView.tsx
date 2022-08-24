import { IonCol, IonContent, IonGrid, IonIcon, IonImg, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import placeholder from '../pictures/placeholder.png'
import { calendar, location } from 'ionicons/icons';
import DiarySegmentActivites from './DiarySegmentActivities';

const DiaryView: React.FC<{diaryId: String, title: String, setModal: Function}>=(props)=>{
    const [diary,setDiary]=React.useState({
        _id: "",
        destination: "",
        name: "",
        startDate: "",
        endDate: "",
        userId: ""
    })
    const [segment,setSegment]=React.useState("activities")
    const [loading,setLoadig]=React.useState(true)

    React.useEffect(()=>{
        fetch(`/diary/getdiary/${props.diaryId}`,{
            method: "GET",
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            setDiary(result.diary)
            setLoadig(false)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <IonPage>
            <BTHeaderModal setModal={props.setModal} title={props.title} />
            <IonContent>
                {
                    loading === true &&
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
                    loading === false &&
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonImg src={placeholder} alt="Placeholder" />
                            </IonCol>
                            <IonCol size="12">
                                <IonText>
                                    <h3>
                                        <IonIcon icon={location} size="large" className="padding-right-minimum" />
                                        {diary.destination}
                                    </h3>
                                </IonText>
                                <IonText>
                                    <IonIcon icon={calendar} className="padding-right-minimum" />
                                    From {new Date(""+diary.startDate).toLocaleDateString()} to {new Date(""+diary.endDate).toLocaleDateString()}</IonText>
                            </IonCol>
                            <IonCol size="12">
                                <IonSegment swipeGesture={true} value={segment} onIonChange={e=>setSegment(e.detail.value)}>
                                    <IonSegmentButton value="activities">
                                        <IonLabel>Activities</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="buddies">
                                        <IonLabel>Buddies</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="planning">
                                        <IonLabel>Planning</IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                            </IonCol>
                            <IonCol size="12">
                                {
                                    segment === "activities" &&
                                    <DiarySegmentActivites diaryId={props.diaryId} />
                                }
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                }
            </IonContent>
        </IonPage>
    )
}

export default DiaryView