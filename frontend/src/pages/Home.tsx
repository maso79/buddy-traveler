import { IonContent, IonPage } from '@ionic/react';
import * as React from 'react';
import BTHeader from '../components/BTHeader';

const Home: React.FC=()=>{
    return(
        <IonPage>
            <BTHeader title="Home" />
            <IonContent>

            </IonContent>
        </IonPage>
    )
}

export default Home