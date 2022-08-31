import { IonFab, IonFabButton, IonIcon, IonImg, IonList, IonModal, IonText } from '@ionic/react';
import { add, addCircle } from 'ionicons/icons';
import * as React from 'react';
import placeholder from '../pictures/placeholder.png'
import ActivityPreview from './ActivityPreview';
import ActivityView from './ActivityView';

const DiarySegmentActivites: React.FC<{diaryId: String, update: number, setActivitiesNumber}>=(props)=>{
    const [activities,setActivites]=React.useState([{
        _id: "",
        name: "",
        description: "",
        place: "",
        startDate: "",
        endDate: ""
    }])
    const [modalActivities,setModalActivities]=React.useState("")

    React.useEffect(()=>{
        setActivites([])
        fetch(`/activity/getactivities/${props.diaryId}`,{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result.data)
            setActivites(result.data)
            console.log(activities.length)
            props.setActivitiesNumber(activities.length)
        })
        .catch(err=>{
            console.log(err)
        })
    },[props.update])

    return(
        <>
            {
                activities.length === 0 &&
                <div className="text-center">
                    <IonImg src={placeholder} alt="placeholder" />
                    <br />
                    <IonText className="text-muted">Looks like there's nothing here...</IonText>
                </div>
            }
            {
                activities.length > 0 &&
                activities.map((activity,i)=>(
                    <ActivityPreview key={i} name={activity.name} place={activity.place} activityId={activity._id} setModalActivities={setModalActivities} />
                ))
            }
            {
                activities.length > 0 &&
                activities.map((activity,i)=>(
                    <IonModal key={i} trigger={"activity"+activity._id} isOpen={modalActivities === activity._id}>
                        <ActivityView key={i} activityName={activity.name} activityId={activity._id} setModal={setModalActivities} />
                    </IonModal>
                ))
            }
        </>
    )
}

export default DiarySegmentActivites