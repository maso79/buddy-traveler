import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonList, IonPage, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const DiaryCreateDestination: React.FC<{ destinations: Array<{placeId: String, description: String}>, setModal: Function, setDestinationId: Function, setDestination: Function, setQuery: Function }>=(props)=>{
    console.log(props.destinations)

    const handle_setDestination=(placeId,placeName)=>{
        props.setDestination(placeName)
        props.setDestinationId(placeId)
        props.setQuery("")
        props.setModal(false)
    }

    return(
        <IonPage>
            <BTHeaderModal
                setModal={props.setModal}
                title="Choose a destination"
            />
            <IonContent>
                <IonGrid className="spazio-lato">
                    <IonCol size="12">
                        <IonList inset>
                            {
                                props.destinations.map((destination)=>(
                                    <IonItem key={""+destination.placeId} button onClick={()=>handle_setDestination(destination.placeId,destination.description)}>
                                        <IonText>{destination.description}</IonText>
                                    </IonItem>
                                ))
                            }
                        </IonList>
                    </IonCol>
                    <IonCol size="12">
                        <IonButton color="light" expand="block" onClick={()=>props.setModal(false)}>Close</IonButton>
                    </IonCol>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default DiaryCreateDestination