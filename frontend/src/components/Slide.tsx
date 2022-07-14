import { IonButton, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonSlide, IonText } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import * as React from 'react';
import { useHistory } from 'react-router';
import '../theme/buddy-traveler.css'

const Slide: React.FC<{ title: String, text: String, picture: string, last: Boolean }>=(props)=>{
    const history=useHistory()

    return(
        <IonSlide>
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <IonImg src={props.picture} className="img-round" />
                    </IonCol>
                   <IonCol size="12" className="text-center">
                        <IonText><h1>{props.title}</h1></IonText>
                        <IonText>{props.text}</IonText>
                    </IonCol>
                    {
                        props.last === false &&
                        <IonCol size="12" className="vertical-center">
                            <br /><br />
                            <IonText>Swipe  </IonText> 
                            <IonIcon icon={arrowForward} />
                        </IonCol>
                    }
                    {
                        props.last === true &&
                        <IonCol size="12">
                            <br />
                            <IonButton color="primary" expand="block" onClick={()=>history.push("/signup")}>Sign up!</IonButton>
                        </IonCol>
                    }
                </IonRow>
            </IonGrid>

        </IonSlide>
    )
}

export default Slide