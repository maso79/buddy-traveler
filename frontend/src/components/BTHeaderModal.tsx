import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { home } from 'ionicons/icons';
import * as React from 'react';

const BTHeaderModal: React.FC<{ title: String, setModal: Function }>=(props)=>{
    return(
        <IonHeader>
            <IonToolbar>
                <IonTitle>{props.title}</IonTitle>
                <IonButtons slot="start">
                    <IonButton onClick={()=>props.setModal(-1)}>
                        <IonIcon icon={home} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}

export default BTHeaderModal