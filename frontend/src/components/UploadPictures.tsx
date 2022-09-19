import { IonPage } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const UploadPictures: React.FC<{ setModal: Function, title: String }>=(props)=>{
    return(
        <IonPage>
            <BTHeaderModal setModal={props.setModal} title="Upload pictures" />
        </IonPage>
    )
}

export default UploadPictures