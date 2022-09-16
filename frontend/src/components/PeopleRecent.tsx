import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonRow, IonText } from '@ionic/react';
import * as React from 'react';
import placeholder from '../pictures/placeholder.png'

const PeopleRecent: React.FC=()=>{
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Recently Viewed People</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonImg src={placeholder} />
                        </IonCol>
                        <IonCol size="12">
                            <IonText>No people to show. Start searching for people with the searchbar above</IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    )
}

export default PeopleRecent