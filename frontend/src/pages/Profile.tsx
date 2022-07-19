import { IonPage } from '@ionic/react';
import * as React from 'react';
import BTHeader from '../components/BTHeader';

const Profile: React.FC=()=>{
    return(
        <IonPage>
            <BTHeader title="Your profile" />
        </IonPage>
    )
}

export default Profile