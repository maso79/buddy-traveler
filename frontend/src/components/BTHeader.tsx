import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { home } from 'ionicons/icons';
import * as React from 'react';
import { useHistory } from 'react-router';

const BTHeader: React.FC<{ title: String }>=(props)=>{
    const history=useHistory()

    return(
        <IonHeader>
            <IonToolbar>
                <IonTitle>{props.title}</IonTitle>
                <IonButtons slot="start">
                    {/* <IonButton onClick={()=>history.push("/home")}>
                        <IonIcon icon={home} />
                    </IonButton> */}
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}

export default BTHeader