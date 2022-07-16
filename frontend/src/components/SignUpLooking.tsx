import { IonButton, IonCheckbox, IonCol, IonItem, IonLabel, IonText } from '@ionic/react';
import * as React from 'react';
import '../theme/buddy-traveler.css'

const SignUpLooking: React.FC<{ setPhase: Function, setPlacesArray: Function }>=(props)=>{
    const [museums,setMuseums]=React.useState(false)
    const [stadiums,setStadiums]=React.useState(false)
    const [landmarks,setLandmarks]=React.useState(false)
    const [typical,setTypical]=React.useState(false)
    const [pubs,setPubs]=React.useState(false)
    const [parks,setParks]=React.useState(false)
    const [restaurants,setRestaurants]=React.useState(false)

    const save=()=>{
        let string=""
        let array

        if (museums) string+="Museum,"
        if (stadiums) string+="Stadium,"
        if (landmarks) string+="Landmark,"
        if (typical) string+="Typical place,"
        if (pubs) string+="Pub,"
        if (parks) string+="Park,"
        if (restaurants) string+="Restaurants,"

        array=string.split(",")
        array.pop() //rimuove l'ultimo elemento vuoto, che si crea perchè resta sempre una virgola finale
        console.log(array)
        props.setPlacesArray(array)
        props.setPhase(2)
    }

    return(
        <>
            <IonCol size="12">
                <IonText className="text-muted">Now give us some information about you preferences</IonText>
            </IonCol>
            <IonCol size="12">
                <br />
                <IonText>What kind of attractions are you looking for?</IonText>
                <br />
                <IonItem>
                    <IonLabel>Museums</IonLabel>
                    <IonCheckbox checked={museums} onIonChange={(e)=>setMuseums(e.detail.value!)} slot="start" />
                </IonItem>
                <IonItem>
                    <IonLabel>Stadiums</IonLabel>
                    <IonCheckbox checked={stadiums} onIonChange={e=>setStadiums(e.detail.value!)} slot="start" />
                </IonItem>
                <IonItem>
                    <IonLabel>National landmarks</IonLabel>
                    <IonCheckbox checked={landmarks} onIonChange={e=>setLandmarks(e.detail.value!)} slot="start" />
                </IonItem>
                <IonItem>
                    <IonLabel>Typical local places</IonLabel>
                    <IonCheckbox checked={typical} onIonChange={e=>setTypical(e.detail.value!)} slot="start" />
                </IonItem>
                <IonItem>
                    <IonLabel>Pubs</IonLabel>
                    <IonCheckbox checked={pubs} onIonChange={e=>setPubs(e.detail.value!)} slot="start" />
                </IonItem>
                <IonItem>
                    <IonLabel>Parks</IonLabel>
                    <IonCheckbox checked={parks} onIonChange={e=>setParks(e.detail.value!)} slot="start" />
                </IonItem>
                <IonItem>
                    <IonLabel>Restaurants</IonLabel>
                    <IonCheckbox checked={restaurants} onIonChange={e=>setRestaurants(e.detail.value!)} slot="start" />
                </IonItem>
            </IonCol>
            <IonCol size="12">
                <IonButton expand="block" color="primary" onClick={save}>Next</IonButton>
            </IonCol>
        </>
    )
}

export default SignUpLooking