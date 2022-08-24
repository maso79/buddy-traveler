import { IonImg, IonList, IonText } from '@ionic/react';
import * as React from 'react';
import placeholder from '../pictures/placeholder.png'

const DiarySegmentActivites: React.FC<{diaryId: String}>=(props)=>{
    const [activities,setActivites]=React.useState([{
        _id: "",
        name: "",
        description: "",
        place: "",
        startDate: "",
        endDate: ""
    }])

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
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

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
        </>
    )
}

export default DiarySegmentActivites