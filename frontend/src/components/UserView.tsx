import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItemDivider, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import placeholder from '../pictures/placeholder.png'
import { personAdd } from 'ionicons/icons';

const UserView: React.FC<{ setModal: Function, userUsername: string, userId: string}>=(props)=>{
    const [userView,setUserView]=React.useState({
        userUsername: props.userUsername,
        userEmail: "",
        userId: "",
        numFollowers: 0,
        numFollowing: 0
    })
    const [isFollowing,setIsFolllowing]=React.useState(false)
    const [isFollowingBack,setIsFollowingBack]=React.useState(false)
    const [loading,setLoading]=React.useState(true)

    React.useEffect(()=>{
        //Controllo se sto seguendo l'utente che sto visualizzando ora
        fetch("/profilestats/isfollowing",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                userFollowedId: props.userId
            })
        })
        .then(result=>result.json())
        .then(result=>{
            setIsFolllowing(result.stato)
            console.log(isFollowing)
        })
        .catch(err=>{
            console.log(err)
        })

        console.log(props.userUsername)
        //recupero i dati dell'utente 
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
            setUserView(result.data)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
        })

        fetch("/profilestats/isfollowingback",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                userFollowedId: props.userId
            })
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            setIsFollowingBack(result.stato)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


    const followUser=()=>{
        fetch("/profilestats/addfollow",{
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
            if(result.stato==="success"){
                setIsFolllowing(true)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const unfollowUser=()=>{
        fetch("/profilestats/removefollow",{
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
            if(result.stato==="success"){
                setIsFolllowing(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    
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
                            <IonCol size="8" offset="2">
                                <IonImg src={placeholder} alt="placeholder" />
                            </IonCol>
                            <IonCol size="6" offset="3">
                                {
                                    isFollowing === false && isFollowingBack===false &&
                                    <IonButton color="primary" expand="block" onClick={followUser}>
                                        <IonIcon icon={personAdd} slot="start" />    
                                        Follow
                                    </IonButton>
                                }
                                {
                                    isFollowing === false && isFollowingBack===true &&
                                    <IonButton color="primary" expand="block" onClick={followUser}>
                                        <IonIcon icon={personAdd} slot="start" />    
                                        Follow back
                                    </IonButton>
                                }
                                {
                                    isFollowing === true &&
                                    <IonButton color="light" expand="block" onClick={unfollowUser}>
                                        Unfollow
                                    </IonButton>
                                }
                            </IonCol>
                            <IonCol size="12">
                                <br /><br />
                            </IonCol>
                            <IonCol size="6" className="text-center">
                                <IonText>{userView.numFollowers} followers</IonText>
                            </IonCol>
                            <IonCol size="6" className="text-center">
                                <IonText>{userView.numFollowing} following</IonText>
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