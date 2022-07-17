import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, IonText } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router';
import removeItemLocalStorage from '../logic/removeItemLocalStorage';
import placeholder from '../pictures/placeholder.png'
import '../theme/buddy-traveler.css'

const Disconnected: React.FC<{ setConfigurato: Function }>=(props)=>{
    const history=useHistory()

    return(
        <IonPage>
            <IonContent>
                <IonGrid className="landing-half">
                    <IonRow>
                        <IonCol size="12">
                            <IonImg src={placeholder} alt="placeholder" />
                        </IonCol>
                        <IonCol size="12" className="text-center">
                            <IonText><h1>You have been disconnected</h1></IonText>
                            <IonText className="text-muted">Sign in again to use Buddy Traveler</IonText>
                        </IonCol>
                        <IonCol size="12">
                            <br />
                            <IonButton expand="block" color="primary" onClick={()=>{
                                removeItemLocalStorage("configurato")
                                props.setConfigurato(null)
                                history.push("/signin")
                            }}>Sign in</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Disconnected