import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonImg, IonRow, IonText } from '@ionic/react';
import { calendar, location } from 'ionicons/icons';
import placeholder from '../pictures/placeholder.png'
import * as React from 'react';

const CardDiaryList: React.FC<{ _id: String, name: String, destination: String, startDate: String, endDate: String, thumbnail , setModalDiaries: Function }>=(props)=>{

    return (
        <IonCard button onClick={()=>props.setModalDiaries(props._id)}>
            <div>
                <IonImg src={props.thumbnail !== "" ? ""+props.thumbnail : placeholder} />
                <h1 className="text-on-image">{props.name}</h1>
            </div>
            <IonCardHeader>
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