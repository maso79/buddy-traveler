import { IonButton, IonCol, IonContent, IonInput, IonItem, IonLabel, IonText, IonToast } from '@ionic/react';
import * as React from 'react';
import '../theme/buddy-traveler.css'

const SignuUpPersonal: React.FC<{ setPhase: Function, setName: Function, setSurname: Function, setUsername: Function, setEmail: Function, setPassword: Function }>=(props)=>{
    const [localName,setLocalName]=React.useState("")
    const [localSurname,setLocalSurname]=React.useState("")
    const [localUsername,setLocalUsername]=React.useState("")
    const [localEmail,setLocalEmail]=React.useState("")
    const [localPassword,setLocalPassword]=React.useState("")
    const [toast,setToast]=React.useState(false)

    const next=()=>{
        try{
            console.log(localName)
            console.log(localSurname)

            if (localName === "") throw new Error("name null")
            if (localSurname === "") throw new Error("surname null")
            if (localUsername === "") throw new Error("username null")
            if (localEmail === "") throw new Error("email null")
            if (localPassword === "") throw new Error("password null")
    
            props.setName(localName)
            props.setSurname(localSurname)
            props.setUsername(localUsername)
            props.setEmail(localEmail)
            props.setPassword(localPassword)
            props.setPhase(1)
        }
        catch (e){
            setToast(true)
        }
    }

    return(
        <>
            <IonCol size="12">
                <IonText className="text-muted">Let's start with some information about you!</IonText>
            </IonCol>
            <IonCol size="12">
                <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput type="text" value={localName} onIonChange={(e)=>setLocalName(e.detail.value!)} />
                </IonItem>
            </IonCol>
            <IonCol size="12">
                <IonItem>
                    <IonLabel position="floating">Surname</IonLabel>
                    <IonInput type="text" value={localSurname} onIonChange={(e)=>setLocalSurname(e.detail.value!)} />
                </IonItem>
            </IonCol>
            <IonCol size="12">
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput type="text" value={localUsername} onIonChange={(e)=>setLocalUsername(e.detail.value!)} />
                </IonItem>
            </IonCol>
            <IonCol size="12">
                <IonItem>
                    <IonLabel position="floating">Your email</IonLabel>
                    <IonInput type="text" value={localEmail} onIonChange={(e)=>setLocalEmail(e.detail.value!)} />
                </IonItem>
            </IonCol>
            <IonCol size="12">
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" value={localPassword} onIonChange={(e)=>setLocalPassword(e.detail.value!)} />
                </IonItem>
            </IonCol>
            <IonCol size="12">
                <IonButton expand="block" onClick={next}>Next</IonButton>
            </IonCol>
            <IonToast
                isOpen={toast}
                onDidDismiss={()=>setToast(false)}
                duration={4000}
                color="danger"
                header="Uh oh"
                message="Look like some fields are empty. Check them to continue"
            />
        </>
            
    )
}

export default SignuUpPersonal