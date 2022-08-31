import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonText } from '@ionic/react';
import { location } from 'ionicons/icons';
import * as React from 'react';
import placeholder from '../pictures/placeholder.png'

const ActivityPreview: React.FC<{activityId: String, name: String, place: String, setModalActivities: Function}>=(props)=>{
    return(
        <IonCard button onClick={()=>props.setModalActivities(props.activityId)}>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="4">
                            <IonImg src={placeholder} />
                        </IonCol>
                        <IonCol size="8">
                            <IonCardSubtitle>{props.name}</IonCardSubtitle>
                            <br />
                            <IonText>
                                <IonIcon icon={location} className="padding-right-minimum" />
                                {props.place}
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    )
}

export default ActivityPreview