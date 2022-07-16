import { IonButton, IonCol, IonImg, IonProgressBar, IonText } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router';
import placeholder from '../pictures/placeholder.png'

const SignUpDone: React.FC<{ state: String }>=(props)=>{
    const history=useHistory()

    return(
        <IonCol size="12" className="text-center">
            {
                props.state === "pending" &&
                <>
                    <IonImg src={placeholder} alt="done" />
                    <IonText><h1>Thank you!</h1></IonText>
                    <IonText className="text-muted">You're now being registred...</IonText>
                    <br /><br />
                    <IonProgressBar type="indeterminate" color="primary" />
                </>
            }
            {
                props.state === "success" &&
                <>
                    <IonImg src={placeholder} alt="done" />
                    <IonText><h1>It's done!</h1></IonText>
                    <IonText className="text-muted">You can now sign in with your email!</IonText>
                    <br /><br />
                    <IonButton expand="block" color="primary" onClick={()=>history.push("/signin")}>Sign in</IonButton>
                </>
            }
            {
                props.state !== "pending" && props.state!=="success" &&
                <>
                    <IonImg src={placeholder} alt="done" />
                    <IonText><h1>Whoops</h1></IonText>
                    <IonText className="text-muted">Looks like there was an error, please go back and try to sign up again!</IonText>
                    <br /><br />
                    <IonText>Error code: {props.state}</IonText>
                    <br /><br />
                    <IonButton expand="block" color="primary" onClick={()=>window.location.reload()}>Back to sign up</IonButton>
                </>
            }
        </IonCol>
    )
}

export default SignUpDone