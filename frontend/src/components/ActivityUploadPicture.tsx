import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const ActivityUploadPicture: React.FC<{ setModal: Function, activityId: string }>=(props)=>{
    return(
        <IonPage>
            <BTHeaderModal setModal={props.setModal} title="Upload pictures" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonText>Choose a picture</IonText>
                            <form>
                                <input type="file" name="profileImage" id=""  />
                                <br /><br />
                            </form>
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

export default ActivityUploadPicture