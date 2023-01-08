import { IonActionSheet, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItemDivider, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import placeholder from '../pictures/placeholder.png'
import { addCircle, closeCircle, lockClosed, lockOpen, personAdd, send } from 'ionicons/icons';

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
    const [actionsheet,setActionSheet]=React.useState(false)
    const [options,setOptions]=React.useState([{
        text: "",
        icon: "",
        role: "",
        handler: ()=>{}
    }])
    const [reload,setReload]=React.useState(0)

    React.useEffect(() => {
        fetch("/people/checkusername", {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                username: props.userUsername
            })
        })
        .then(result => result.json())
        .then(result => {
            if (result.stato) {
                window.location.href = "/profile"
            } else {
                console.log("non è il tuo profilo")
            }
        })


        fetch("/profilestats/friendship-status/"+props.userId,{
            method: "GET",
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            if (result.following){
                //non seguire più
                options.push({
                    text: "Unfollow",
                    icon: closeCircle,
                    role: "edit",
                    handler: ()=>unfollowUser()
                })
            }
            else if (result.private){
                //richiedi
                options.push({
                    text: "Send friendship request",
                    icon: send,
                    role: "edit",
                    handler: ()=>{}
                })
            }
            else{
                //segui
                options.push({
                    text: "Follow",
                    icon: addCircle,
                    role: "edit",
                    handler: ()=>followUser()
                })
            }

            if (result.isBlocked){
                //sblocca
                options.push({
                    text: "Unlock user",
                    icon: lockOpen,
                    role: "edit",
                    handler: ()=>{}
                })
            }
            else{
                //blocca
                options.push({
                    text: "Lock user",
                    icon: lockClosed,
                    role: "edit",
                    handler: ()=>{}
                })
            }

        })
        .catch(err=>{
            console.log(err)
        })

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


        //aggiungo questo utente alle visualizzazioni recenti
        fetch("/people/recentsearch",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                username: props.userUsername
            })
        })
    },[reload])


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
                setOptions([])
                setReload(reload+1)
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
                setOptions([])
                setReload(reload+1)
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
                            <IonCol size="8" offset="2">
                                <IonButton color="light" expand="block" onClick={()=>setActionSheet(true)}>
                                    <IonIcon icon={personAdd} slot="start" />    
                                    Options for {userView.userUsername}
                                </IonButton>
                                {/* {
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
                                } */}
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
                <IonActionSheet
                    isOpen={actionsheet}
                    onDidDismiss={()=>setActionSheet(false)}
                    header={"Options on this user"}
                    buttons={options}
                />
            </IonContent>
            
        </IonPage>
    )
}

export default UserView