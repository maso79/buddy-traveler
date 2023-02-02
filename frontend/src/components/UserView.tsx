import { IonActionSheet, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItemDivider, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import placeholder from '../pictures/placeholder.png'
import placeholder_profile from '../pictures/placeholder_profile.png'
import { addCircle, closeCircle, lockClosed, lockOpen, personAdd, send } from 'ionicons/icons';
import UserViewDiaries from './UserViewDiaries';
import serverFetchNative from '../logic/serverFetchNative';

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
    const [loadingPicture,setLoadingPicture]=React.useState(true)
    const [actionsheet,setActionSheet]=React.useState(false)
    const [path,setPath]=React.useState(placeholder)
    const [diaries,setDiaries]=React.useState([])
    const [options,setOptions]=React.useState([{
        text: "",
        icon: "",
        role: "",
        handler: ()=>{}
    }])
    const [reload,setReload]=React.useState(0)

    const checkUsername = async () => {
        const result = await serverFetchNative("/people/checkusername", "POST", JSON.stringify({ username: props.userUsername }))
        if (result.stato) {
            window.location.href = "/profile"
        } else {
            console.log("non è il tuo profilo")
        }
    }

    const friendshipStatus = async () => {
        const result = await serverFetchNative("/profilestats/friendship-status/" + props.userId, "GET", JSON.stringify({}))
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
    }

    const checkIsFollowing = async () => {
        const result = await serverFetchNative("/profilestats/isfollowing", "POST", JSON.stringify({ userFollowedId: props.userId }))
        setIsFolllowing(result.stato)
        console.log(isFollowing)
    }

    const getUserStats = async () => {
        const result = await serverFetchNative("/profilestats/getuserstats", "POST", JSON.stringify({ userUsername: props.userUsername }))
        console.log(result)
        setUserView(result.data)
        setLoading(false)
    }

    const checkIsFollowingBack = async () => {
        const result = await serverFetchNative("/profilestats/isfollowingback", "POST", JSON.stringify({ userFollowedId: props.userId }))
        console.log(result)
        setIsFollowingBack(result.stato)
    }

    const recentSearch = async () => {
        const result = await serverFetchNative("/people/recentsearch", "POST", JSON.stringify({ username: props.userUsername }))
    }


    React.useEffect(() => {
        retriveImage()
        retriveDiaries()

        // fetch("/people/checkusername", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({
        //         username: props.userUsername
        //     })
        // })
        // .then(result => result.json())
        // .then(result => {
        //     if (result.stato) {
        //         window.location.href = "/profile"
        //     } else {
        //         console.log("non è il tuo profilo")
        //     }
        // })
        checkUsername()


        // fetch("/profilestats/friendship-status/"+props.userId,{
        //     method: "GET",
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     console.log(result)
        //     if (result.following){
        //         //non seguire più
        //         options.push({
        //             text: "Unfollow",
        //             icon: closeCircle,
        //             role: "edit",
        //             handler: ()=>unfollowUser()
        //         })
        //     }
        //     else if (result.private){
        //         //richiedi
        //         options.push({
        //             text: "Send friendship request",
        //             icon: send,
        //             role: "edit",
        //             handler: ()=>{}
        //         })
        //     }
        //     else{
        //         //segui
        //         options.push({
        //             text: "Follow",
        //             icon: addCircle,
        //             role: "edit",
        //             handler: ()=>followUser()
        //         })
        //     }

        //     if (result.isBlocked){
        //         //sblocca
        //         options.push({
        //             text: "Unlock user",
        //             icon: lockOpen,
        //             role: "edit",
        //             handler: ()=>{}
        //         })
        //     }
        //     else{
        //         //blocca
        //         options.push({
        //             text: "Lock user",
        //             icon: lockClosed,
        //             role: "edit",
        //             handler: ()=>{}
        //         })
        //     }

        // })
        // .catch(err=>{
        //     console.log(err)
        // })
        friendshipStatus()

        //Controllo se sto seguendo l'utente che sto visualizzando ora
        // fetch("/profilestats/isfollowing",{
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({
        //         userFollowedId: props.userId
        //     })
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     setIsFolllowing(result.stato)
        //     console.log(isFollowing)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
        checkIsFollowing()

        //recupero i dati dell'utente 
        // fetch("/profilestats/getuserstats",{
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({
        //         userUsername: props.userUsername
        //     })
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     console.log(result)
        //     setUserView(result.data)
        //     setLoading(false)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
        getUserStats()


        // fetch("/profilestats/isfollowingback",{
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({
        //         userFollowedId: props.userId
        //     })
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     console.log(result)
        //     setIsFollowingBack(result.stato)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
        checkIsFollowingBack()


        //aggiungo questo utente alle visualizzazioni recenti
        // fetch("/people/recentsearch",{
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({
        //         username: props.userUsername
        //     })
        // })
        recentSearch()
    },[reload])


    const followUser = async () => {
        
        const result = await serverFetchNative("/profilestats/addfollow", "POST", JSON.stringify({ userUsername: props.userUsername }))
        if(result.stato==="success"){
            setIsFolllowing(true)
            setOptions([])
            setReload(reload+1)
        }

        // fetch("/profilestats/addfollow",{
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({
        //         userUsername: props.userUsername
        //     })
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     if(result.stato==="success"){
        //         setIsFolllowing(true)
        //         setOptions([])
        //         setReload(reload+1)
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }

    const unfollowUser = async () => {
        const result = await serverFetchNative("/profilestats/removefollow", "POST", JSON.stringify({ userUsername: props.userUsername }))
        if(result.stato==="success"){
            setIsFolllowing(false)
            setOptions([])
            setReload(reload+1)
        }

        // fetch("/profilestats/removefollow",{
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({
        //         userUsername: props.userUsername
        //     })
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     if(result.stato==="success"){
        //         setIsFolllowing(false)
        //         setOptions([])
        //         setReload(reload+1)
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }

    const retriveImage = async () => {

        const { url } = await serverFetchNative("/update/profileusernameimage", "POST", JSON.stringify({ username: props.userUsername }))

        // const { url } = await fetch("/update/profileusernameimage", {
        //     method: 'POST',
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({ username: props.userUsername })
        // })
        // .then(res => res.json())
        
        if (url.url == "not found") {
            setLoadingPicture(false)            
           return
        }
        
        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
        
        setLoading(false)
        setLoadingPicture(false)
    }

    const retriveDiaries = async () => {

        const result = await serverFetchNative("/diary/retrivediariesbyid", "POST", JSON.stringify({ userId: props.userId }))
        if(result.data) {
            result.data.forEach(element => {
                setDiaries(current => [...current, element])
            });
        } else {
            console.log("error")
        }

        // const data = await fetch("/diary/retrivediariesbyid", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type':'Application/JSON'
        //     },
        //     body: JSON.stringify({ userId: props.userId })
        // })
        // .then(res => res.json())
        // .then(response => {
        //     if(response.data) {
        //         response.data.forEach(element => {
        //             setDiaries(current => [...current, element])
        //         });
        //     } else {
        //         console.log("error")
        //     }
        // })
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
                                <IonImg src={path} alt="placeholder" />
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
                            <IonCol size="12">
                                <UserViewDiaries userId={props.userId} username={props.userUsername } />
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