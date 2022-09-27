import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonItem, IonList } from '@ionic/react';
import * as React from 'react';

const PeopleSuggestions: React.FC<{ suggestions: Array<{_id: string, profilePicture: string, username: string}>, setUserIdView: Function, setUserUsername: Function, setModalUserView: Function }>=(props)=>{
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
                                console.log(item)
                                props.setUserIdView(item._id)
                                props.setUserUsername(item.username)
                                props.setModalUserView(true)
                            }}>{item.username}</IonItem>
                        ))
                    }
                </IonList>
            </IonCardContent>
        </IonCard>
    )
}

export default PeopleSuggestions