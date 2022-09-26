import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonItem, IonList } from '@ionic/react';
import * as React from 'react';

const PeopleSuggestions: React.FC<{ suggestions: Array<{id: string, profilePicture: string, username: string}>, setUserIdView: Function, setModalUserView: Function }>=(props)=>{
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Suggestions</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    {
                        props.suggestions.map((item,i)=>(
                            <IonItem button key={i} onClick={()=>{
                                props.setModalUserView(true)
                                props.setUserIdView(item.username)
                            }}>{item.username}</IonItem>
                        ))
                    }
                </IonList>
            </IonCardContent>
        </IonCard>
    )
}

export default PeopleSuggestions