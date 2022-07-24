import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonText } from '@ionic/react';
import { location } from 'ionicons/icons';
import * as React from 'react';

const CardDiaryList: React.FC<{ name: String, destination: String, startDate: String, endDate: String, thumbnail: String }>=(props)=>{
    return(
        <IonCard button>
            <IonImg src={""+props.thumbnail} />
            <IonCardHeader>
                <IonCardTitle>{props.name}</IonCardTitle>
                <br />
                <IonCardSubtitle>
                    <IonIcon icon={location}  />
                    <IonText>
                        {props.destination}, from {new Date(""+props.startDate).toLocaleDateString()} to {new Date(""+props.endDate).toLocaleDateString()}
                    </IonText>
                </IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    )
}

export default CardDiaryList