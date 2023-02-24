import { IonActionSheet, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItemDivider, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import placeholder from '../pictures/placeholder.png'
import placeholder_profile from '../pictures/placeholder_profile.png'
import { addCircle, closeCircle, lockClosed, lockOpen, personAdd, send } from 'ionicons/icons';
import UserViewDiaries from '../components/UserViewDiaries';
import BTHeader from '../components/BTHeader';
import { useHistory, useLocation } from 'react-router';
import serverFetchNative from '../logic/serverFetchNative';

const PeopleUserView: React.FC=()=>{
    const [userView,setUserView]=React.useState({
        userUsername: "",
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
    const [usernamePrint,setUsernamePrint]=React.useState("")
    let userUsername=""
    let userId=""
    const location=useLocation()

    const checkUsername = async () => {
        const result = await serverFetchNative("/people/checkusername", "POST", JSON.stringify({ username: userUsername }))
        if (result.stato) {
            window.location.href = "/profile"
        } else {
            console.log("non è il tuo profilo")
        }
    }

    const makeFriendshipRequest= async ()=>{
        const result = await serverFetchNative("/makefriendlyrequest", "POST", JSON.stringify({ id: userId }))
        console.log(result)

            // fetch("/makefriendlyrequest",{
            //     method: "POST",
            //     headers:{
            //         "Content-Type": "Application/JSON"
            //     },
            //     body: JSON.stringify({id: userId})
            // })
            // .then(result=>result.json())
            // .then(result=>{
            //     console.log(result)
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
    }

    const friendshipStatus = async () => {
        const result = await serverFetchNative("/profilestats/friendship-status/"+userId, "GET", JSON.stringify({}))

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
                handler: ()=>makeFriendshipRequest()
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
        const result = await serverFetchNative("/profilestats/isfollowing", "POST", JSON.stringify({ userFollowedId: userId }))
        setIsFolllowing(result.stato)
        console.log(isFollowing)
    }

    const getUserStats = async () => {
        const result = await serverFetchNative("/profilestats/getuserstats", "POST", JSON.stringify({ userUsername: userUsername }))
        console.log(result)
        setUserView(result.data)
        setLoading(false)
    }

    const checkIsFollowingBack = async () => {
        const result = await serverFetchNative("/profilestats/isfollowingback", "POST", JSON.stringify({ userFollowedId: userId }))
        console.log(result)
        setIsFollowingBack(result.stato)
    }

    const addRecentUser = async () => {
        const result = await serverFetchNative("/people/recentsearch", "POST", JSON.stringify({ username: userUsername}))
    }

    React.useEffect(() => {
        const url=location.pathname
        const user=url.split("/")[2]
        setOptions([])

        console.log(user.split("&"))

        userUsername=user.split("&")[0]
        userId=user.split("&")[1]
        setUsernamePrint(userUsername)

        retriveImage()
        retriveDiaries()

        checkUsername()

        friendshipStatus()

        checkIsFollowing()

        getUserStats()

        checkIsFollowingBack()

        addRecentUser()
    },[reload])


    //fuori dall useEffect

    const followUser= async ()=>{
        fetch("/profilestats/addfollow",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                userUsername: userUsername
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

    const unfollowUser= async ()=>{
        
        const result = await serverFetchNative("/profilestats/removefollow", "POST", JSON.stringify({ userUsername: userUsername}))
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
        //         userUsername: userUsername
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

        const { url } = await serverFetchNative("/update/profileusernameimage", "POST", JSON.stringify({ username: userUsername }))

        // const { url } = await fetch("/update/profileusernameimage", {
        //     method: 'POST',
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({ username: userUsername })
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

        const response = await serverFetchNative("/diary/retrivediariesbyid", "POST", JSON.stringify({ userId: userId }))
        if(response.data) {
            response.data.forEach(element => {
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
        //     body: JSON.stringify({ userId: userId })
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
            <BTHeader title="User" />
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
                            <IonCol size="12" className="text-center landing"><h1>{usernamePrint}</h1></IonCol>
                            <IonCol size="8" offset="2">
                                <IonImg src={path} alt="placeholder" className='profile-pic' />
                            </IonCol>
                            <IonCol size="8" offset="2">
                                <IonButton color="light" expand="block" onClick={()=>setActionSheet(true)}>
                                    <IonIcon icon={personAdd} slot="start" />    
                                    Options for {usernamePrint}
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
                                <UserViewDiaries userId={userId} username={usernamePrint} />
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

export default PeopleUserView