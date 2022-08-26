import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import placeholder from '../pictures/placeholder.png'
import { add, calendar, checkbox, cog, home, location, newspaper, pencil, people } from 'ionicons/icons';
import DiarySegmentActivites from './DiarySegmentActivities';
import DiaryEdit from './DiaryEdit';
import ActivityCreate from './ActivityCreate';
import placeholder_profile from '../pictures/placeholder.png'

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
    const [modal,setModal]=React.useState(-1)
    const [loading, setLoadig] = React.useState(true)
    const [path,setPath]=React.useState(placeholder_profile)

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

        getThumbnail()
    },[])

    const getThumbnail = async () => {
        const data = { diaryId: props.diaryId }
        const { url } = await fetch("/update/showdiaryimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        
        console.log(url)
        if (url.url == "not found") {           
           return
        }
        
        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{props.title}</IonTitle>
                    <IonButtons slot="start">
                        <IonButton onClick={()=>props.setModal(-1)}>
                            <IonIcon icon={home} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
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
                    <>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12">
                                    <IonImg src={path} alt="Placeholder" />
                                </IonCol>
                                <IonCol size="12">
                                    <IonCard button onClick={()=>setModal(1)}>
                                        <IonCardHeader>
                                            <IonCardSubtitle>
                                            </IonCardSubtitle>
                                            <IonCardTitle>
                                                General information
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonText>
                                                <h3>
                                                    <IonIcon icon={location} className="padding-right-minimum" />
                                                    {diary.destination}
                                                </h3>
                                            </IonText>
                                            <IonText>
                                                <IonIcon icon={calendar} className="padding-right-minimum" />
                                                From {new Date(""+diary.startDate).toLocaleDateString()} to {new Date(""+diary.endDate).toLocaleDateString()}
                                            </IonText>
                                            <br />
                                            <IonText>
                                                <IonIcon icon={newspaper} className="padding-right-minimum" />
                                                0 activities
                                            </IonText>
                                            <br />
                                            <IonText>
                                                <IonIcon icon={people} className="padding-right-minimum" />
                                                0 buddies
                                            </IonText>
                                            <br />
                                            <IonText>
                                                <IonIcon icon={checkbox} className="padding-right-minimum" />
                                                Nothing planned
                                            </IonText>
                                            <br /><br />
                                            <IonText>Tap here to edit this diary &raquo;</IonText>
                                        </IonCardContent>
                                    </IonCard>
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
                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                            <IonFabButton>
                                <IonIcon icon={add} />
                            </IonFabButton>
                            <IonFabList side="top">
                                <IonFabButton>
                                    <IonIcon icon={newspaper} onClick={()=>setModal(2)} />
                                </IonFabButton>
                                <IonFabButton>
                                    <IonIcon icon={people} />
                                </IonFabButton>
                                <IonFabButton>
                                    <IonIcon icon={checkbox} />
                                </IonFabButton>
                            </IonFabList>
                        </IonFab>

                        <IonModal trigger="modalSettings" isOpen={modal === 1}>
                            <DiaryEdit setModal={setModal} diaryId={props.diaryId} />
                        </IonModal>
                        <IonModal trigger="modalCreateActivity" isOpen={modal === 2}>
                            <ActivityCreate setModal={setModal} />
                        </IonModal>
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default DiaryView