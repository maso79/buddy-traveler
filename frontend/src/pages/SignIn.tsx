import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router';
import setItemLocalStorage from '../logic/setItemLocalStorage';
import placeholder_logo from '../pictures/placeholder-logo.png'

const SignIn: React.FC<{ setConfigurato: Function }>=(props)=>{
    const history=useHistory()
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [processing,setProcessing]=React.useState(false)
    const [toastError,setToastError]=React.useState(false)
    const [toastTitle,setToastTitle]=React.useState("")
    const [toastText,setToastText]=React.useState("")

    const signin=async ()=>{
        setProcessing(true)
        fetch("/auth/signin",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            if (result.stato==="success"){
                setItemLocalStorage("configurato",true)
                props.setConfigurato(true)
                history.push("/home")
            }
            if (result.stato==="error: null"){
                setToastTitle("Wrong data")
                setToastText("Looks like the username or password you used is not valid. Please try again with different data")
                setToastError(true)
            }
        })
        .catch(err=>{
            setProcessing(false)
        })
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign in</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid className="landing-top">
                    <IonRow>
                        <IonCol size="6" offset="3">
                            <IonImg src={placeholder_logo} className="img-round" />
                        </IonCol>
                        <IonCol size="12" className="text-center">
                            <IonText><h1>Sign in at Buddy Traveler</h1></IonText>
                        </IonCol>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="floating">Your email</IonLabel>
                                <IonInput value={email} onIonChange={e=>setEmail(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="floating">Your password</IonLabel>
                                <IonInput type="password" value={password} onIonChange={e=>setPassword(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <br />
                            <IonButton expand="block" color="primary" onClick={signin} disabled={processing}>Sign in</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonButton expand="block" fill="clear" color="secondary" onClick={()=>history.push("/signup")}>Not registered yet?</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonToast
                    isOpen={toastError}
                    onDidDismiss={()=>setToastError(false)}
                    duration={2000}
                    color="danger"
                    header={toastTitle}
                    message={toastText}
                />
            </IonContent>
        </IonPage>
    )
}

export default SignIn