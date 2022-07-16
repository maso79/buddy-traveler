import { IonButton, IonCard, IonCheckbox, IonCol, IonItem, IonLabel, IonText } from '@ionic/react';
import * as React from 'react';
import '../theme/buddy-traveler.css'

const SignUpGroups: React.FC<{ setPhase: Function, setGroups: Function }>=(props)=>{
    const [options,setOptions]=React.useState([])
    const [solo,setSolo]=React.useState(false)
    const [two,setTwo]=React.useState(false)
    const [three,setThree]=React.useState(false)
    const [four,setFour]=React.useState(false)
    const [five,setFive]=React.useState(false)
    const [ten,setTen]=React.useState(false)

    const next=()=>{
        let arrayOptions=[]

        if (solo) arrayOptions.push("Solo")
        if (two) arrayOptions.push("Group of 2 people")
        if (three) arrayOptions.push("Group of 3 people")
        if (four) arrayOptions.push("Group of 4 people")
        if (five) arrayOptions.push("Group of 5 to 10 people")
        if (ten) arrayOptions.push("Group of more than 10 people")

        props.setGroups(arrayOptions)
        props.setPhase(4)
    }

    return(
        <>
            <IonCol size="12">
                <IonText className="text-muted">With how many people would you like to travel?</IonText>
            </IonCol>
            <IonCol size="12">
                <IonItem>
                    <IonLabel>Solo</IonLabel>
                    <IonCheckbox slot="start" checked={solo} onIonChange={(e)=>setSolo(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Group of 2 people</IonLabel>
                    <IonCheckbox slot="start" checked={two} onIonChange={(e)=>setTwo(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Group of 3 people </IonLabel>
                    <IonCheckbox slot="start" checked={three} onIonChange={(e)=>setThree(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Group of 4 people</IonLabel>
                    <IonCheckbox slot="start" checked={four} onIonChange={(e)=>setFour(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Group of 5 to 10 people</IonLabel>
                    <IonCheckbox slot="start" checked={five} onIonChange={(e)=>setFive(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Group of more than 10 people</IonLabel>
                    <IonCheckbox slot="start" checked={ten} onIonChange={(e)=>setTen(e.detail.value!)} />
                </IonItem>
            </IonCol>
            <IonCol size="12">
                <IonButton expand="block" color="primary" onClick={next}>Next</IonButton>
            </IonCol>
        </>
    )
}

export default SignUpGroups