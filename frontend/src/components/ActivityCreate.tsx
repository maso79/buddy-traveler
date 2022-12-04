import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonText, IonTextarea } from '@ionic/react';
import { search } from 'ionicons/icons';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import DateSelect from './DateSelect';

const ActivityCreate: React.FC<{ diaryId: String, setModal: Function, setUpdate: Function, update: number }>=(props)=>{
    const [name,setName]=React.useState("")
    const [description,setDescription]=React.useState("")
    const [place,setPlace]=React.useState("")
    const [startDate,setStartDate]=React.useState("")
    const [time,setTime]=React.useState("")
    const [modalStartDate,setModalStartDate]=React.useState(false)
    const [chosenDestination,setChosenDestination]=React.useState("")
    const [placeId,setPlaceId]=React.useState("")
    const [buttonDisabled,setButtonDisabled]=React.useState(true)

    const activity_create=()=>{
        fetch("/activity/createone",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                name,
                description,
                place: placeId,
                date: startDate,
                time,
                diaryId: props.diaryId
            })
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            props.setUpdate(props.update+1)
            props.setModal(false)

        })
        .catch(err=>{
            console.log(err)
        })
    }

    const search_places=()=>{
        fetch(`/places/getplace/${place}`,{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            setChosenDestination(result.stato[0].name)
            setPlaceId(result.stato[0].id)
            setButtonDisabled(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
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
                            <IonButton color="primary" onClick={search_places}>
                                <IonIcon icon={search} />
                            </IonButton>
                        </IonCol>
                        <IonCol size="12">
                            {
                                chosenDestination != "" &&
                                <IonText className="text-muted">Destination chosen: {chosenDestination}</IonText>
                            }
                            <br />
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel>Date</IonLabel>
                            <br />
                            {
                                startDate !== "" &&
                                <IonText className="text-muted">Selected date: {new Date(""+startDate).toLocaleDateString()}</IonText>
                            }
                            <IonButton color="light" expand="block" onClick={()=>setModalStartDate(true)}>Select date</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel>Time</IonLabel>
                            <IonDatetime value={time} onIonChange={e=>setTime(e.detail.value!)} presentation="time" />
                        </IonCol>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="floating">Description</IonLabel>
                                <IonTextarea autoGrow autoCapitalize="sentences" spellcheck value={description} onIonChange={e=>setDescription(e.detail.value!)} /> 
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton color="primary" expand="block" onClick={activity_create}>Create activity</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton color="light" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonModal isOpen={modalStartDate} trigger="modalStartDate" onDidDismiss={()=>setModalStartDate(false)}>
                    <DateSelect date={startDate} setDate={setStartDate} setModal={setModalStartDate} />
                </IonModal>
            </IonContent>
        </IonPage>
    )
}

export default ActivityCreate