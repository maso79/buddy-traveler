import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTextarea } from '@ionic/react';
import { search } from 'ionicons/icons';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const ActivityCreate: React.FC<{ setModal: Function }>=(props)=>{
    const [name,setName]=React.useState("")
    const [description,setDescription]=React.useState("")
    const [place,setPlace]=React.useState("")
    const [startDate,setStartDate]=React.useState("")
    const [endDate,setEndDate]=React.useState("")
    
    return(
        <IonPage>
            <BTHeaderModal setModal={props.setModal} title="Create activity" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput value={name} onIonChange={e=>setName(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                        <IonCol size="10">
                            <IonItem>
                                <IonLabel position="floating">Destination</IonLabel>
                                <IonInput value={place} onIonChange={e=>setPlace(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                        <IonCol size="2">
                            <IonButton color="primary">
                                <IonIcon icon={search} />
                            </IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel>Start date</IonLabel>
                            <br />
                            {
                                startDate !== "" &&
                                <IonText className="text-muted">Selected date: {new Date(""+startDate).toLocaleDateString()}</IonText>
                            }
                            <IonButton color="light" expand="block">Select date</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel>End date</IonLabel>
                            <br />
                            {
                                endDate !== "" &&
                                <IonText className="text-muted">Selected date: {new Date(""+endDate).toLocaleDateString()}</IonText>
                            }
                            <IonButton color="light" expand="block">Select date</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="floating">Description</IonLabel>
                                <IonTextarea autoGrow autoCapitalize="sentences" spellcheck /> 
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton color="primary" expand="block">Create activity</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton color="light" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default ActivityCreate