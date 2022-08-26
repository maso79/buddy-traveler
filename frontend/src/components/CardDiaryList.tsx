import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonImg, IonRow, IonText } from '@ionic/react';
import { calendar, location } from 'ionicons/icons';
import * as React from 'react';

const CardDiaryList: React.FC<{ _id: String, name: String, destination: String, startDate: String, endDate: String, thumbnail , setModalDiaries: Function }>=(props)=>{
    
    const getThumbnail = async (diaryId) => {
        const data = { diaryId }
        const { url } = await fetch("/update/showdiaryimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        
        if (url.url == "not found") {           
           return
        }
        
        const imageUrl = url.split('?')[0]
        return imageUrl
    }

    return (
        <IonCard button onClick={()=>props.setModalDiaries(props._id)}>
            <IonImg src={""+getThumbnail(props._id)} />
            <IonCardHeader>
                <IonCardTitle>{props.name}</IonCardTitle>
                <br />
                <IonCardSubtitle>
                    <IonRow>
                        <IonCol size="12">
                            <IonIcon icon={location} className="padding-right-minimum" />
                            <IonText>
                                {props.destination}
                            </IonText>
                        </IonCol>
                        <IonCol size="12">
                            <IonIcon icon={calendar} className="padding-right-minimum" />
                            <IonText>
                                From {new Date(""+props.startDate).toLocaleDateString()} to {new Date(""+props.endDate).toLocaleDateString()}
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    )
}

export default CardDiaryList