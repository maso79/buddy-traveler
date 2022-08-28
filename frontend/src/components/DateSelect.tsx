import { IonButton, IonCol, IonDatetime, IonGrid, IonLabel, IonRow } from '@ionic/react';
import * as React from 'react';

import '../theme/buddy-traveler.css'

const DateSelect: React.FC<{date: string, setDate: Function, setModal: Function}>=(props)=>{
    return(
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <br />
                    <IonLabel className="spazio-lato text-white">Select a date</IonLabel>
                    <br /><br />
                    <IonDatetime
                        //className="text-white"
                        firstDayOfWeek={1}
                        value={props.date}
                        onIonChange={e=>props.setDate(e.detail.value!)} 
                        presentation="date"
                    />
                </IonCol>
                <IonCol size="12">
                    <IonButton color="primary" expand="block" onClick={()=>props.setModal(false)}>Done</IonButton>
                </IonCol>
                <IonCol size="12">
                    <IonButton color="light" expand="block" onClick={()=>props.setModal(false)}>Close</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default DateSelect