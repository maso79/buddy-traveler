import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText } from '@ionic/react';
import * as React from 'react';

const CardNoDiaries: React.FC=()=>{
    return(
        <IonCard button color="primary">
            <IonCardHeader>
                <IonCardTitle>A tip from Buddy Traveler</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonText>Diaries are travel logs. You can use them to keep note of what you've done while on vacation.</IonText>
                <br />
                <IonText>To create your first diary, tap the '+' button or click this card &raquo;</IonText>
            </IonCardContent>
        </IonCard>
    )
}

export default CardNoDiaries