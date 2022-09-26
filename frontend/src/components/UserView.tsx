import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItemDivider, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import placeholder from '../pictures/placeholder.png'
import { personAdd } from 'ionicons/icons';

const UserView: React.FC<{ setModal: Function, userUsername: string}>=(props)=>{
    const [userView,setUserView]=React.useState({
        username: props.userUsername,
        imageName: "",
        nfollower: 0,
        nfollowing: 0
    })
    const [loading,setLoading]=React.useState(true)

    React.useEffect(()=>{
        console.log(props.userUsername)
        fetch("/profilestats/getuserstats",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                userUsername: props.userUsername
            })
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            setUserView(result.stato)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
        })
    })
    
    return(
        <IonPage>
            <BTHeaderModal setModal={props.setModal} title="User" />
            <IonContent>
                {
                    loading === true &&
                    <IonGrid className="landing-half">
                        <IonRow>
                            <IonCol size="12" className="text-center">
                                <IonSpinner name="crescent" /><br />
                                <IonText>Loading your data...</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
                {
                    loading === false &&
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" className="text-center landing"><h1>{props.userUsername}</h1></IonCol>
                            <IonCol size="6" offset="3">
                                <IonImg src={placeholder} alt="placeholder" />
                            </IonCol>
                            <IonCol size="6" offset="3">
                                <IonButton color="primary" expand="block">
                                    <IonIcon icon={personAdd} slot="start" />    
                                    Follow
                                </IonButton>
                            </IonCol>
                            <IonCol size="6" className="text-center">
                                <IonButton color="light" expand="block">Follower</IonButton>
                            </IonCol>
                            <IonCol size="6" className="text-center">
                                <IonButton color="light" expand="block">Following</IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonItemDivider />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
            </IonContent>
        </IonPage>
    )
}

export default UserView