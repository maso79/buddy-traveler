import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonItem, IonList } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router';

const PeopleSuggestions: React.FC<{ suggestions: Array<{_id: string, profilePicture: string, username: string}>, setUserIdView: Function, setUserUsername: Function, setModalUserView: Function }>=(props)=>{
    const history=useHistory()

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Suggestions</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    {
                        props.suggestions.map((item,i)=>(
                            <IonItem button key={i} onClick={()=>{
                                // props.setUserIdView(user._id)
                                // props.setUserUsername(user.username)
                                // props.setModalUserView(1)

                                history.push(`/people/${item.username}&${item._id}`)
                            }}>{item.username}</IonItem>
                        ))
                    }
                </IonList>
            </IonCardContent>
        </IonCard>
    )
}

export default PeopleSuggestions