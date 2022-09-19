import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonItem, IonList } from '@ionic/react';
import * as React from 'react';

const prova=[
    "prova 1",
    "prova 2",
    "prova 3",
    "prova 4",
]

const PeopleSuggestions: React.FC<{ suggestions: Array<{profilePicture: string, username: string}> }>=(props)=>{
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Suggestions</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    {
                        props.suggestions.map((item,i)=>(
                            <IonItem button key={i}>{item.username}</IonItem>
                        ))
                    }
                </IonList>
            </IonCardContent>
        </IonCard>
    )
}

export default PeopleSuggestions