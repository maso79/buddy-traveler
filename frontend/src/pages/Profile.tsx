import { IonActionSheet, IonAlert, IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonRow, IonSpinner, IonText, useIonActionSheet } from '@ionic/react';
import { atCircle, camera, closeCircle, key, lockClosed, logOut, shield } from 'ionicons/icons';
import * as React from 'react';
import { useHistory } from 'react-router';
import BTHeader from '../components/BTHeader';
import ProfileEmail from '../components/ProfileEmail';
import ProfilePassword from '../components/ProfilePassword';
import ProfilePersonalInfo from '../components/ProfilePersonalInfo';
import ProfilePictures from '../components/ProfilePicture';
import ProfilePrivacy from '../components/ProfilePrivacy';
import serverFetchNative from '../logic/serverFetchNative';
import placeholder_profile from '../pictures/placeholder-profile.png'


const Profile: React.FC<{ setAutorizzato: Function, setConfigurato: Function }>=(props)=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [username,setUsername]=React.useState("")
    const [name,setName]=React.useState("")
    const [modal,setModal]=React.useState(-1)
    const [path,setPath]=React.useState(placeholder_profile)
    const [loadingPicture,setLoadingPicture]=React.useState(true)
    const [actionsheet,setActionsheet]=React.useState(false)
    const [followersNumber,setFollowersNumber]=React.useState(0)
    const [followingNumber,setFollowingNumber]=React.useState(0)
    const history=useHistory()

    const items=[
        {
            text: "Your personal information",
            icon: lockClosed,
            role: "edit",
            handler: ()=>{
                setModal(0)
            }
        },
        {
            text: "Your email",
            icon: atCircle,
            role: "edit",
            handler: ()=>{
                setModal(1)
            }
        },
        {
            text: "Your password",
            icon: key,
            modal: 2,
            role: "edit",
                hanhandler: ()=> ()=>setModal(2)
         },
        {
            text: "Profile picture",
            icon: camera,
            role: "edit",
            handler: ()=>{
                setModal(3)
            }
        },
        {
            text: "Privacy",
            icon: shield,
            role: "edit",
            handler: ()=>{
                setModal(4)
            }
        },
        {
            text: "Logout",
            icon: logOut,
            role: "edit",
            handler: ()=>{
                setModal(5)
            }
        },
        {
            text: 'Close',
            role: 'cancel',
            icon: closeCircle,
            data: {
                handler: 'cancel',
            },
        },
    ]
    
    const getAll = async () => {
        const result = await serverFetchNative("/profile/all", "GET", JSON.stringify({}))
        if (result.user.email){
            setName(result.user.name)
            setUsername(result.user.username)
            setIsLoading(false)
        }
    }

    const getFollowers = async () => {
        const result = await serverFetchNative("/profilestats/followers", "GET", JSON.stringify({}))
        console.log(result)
        setFollowersNumber(result.followers.length)
    } 

    const getFollowing = async () => {
        const result = await serverFetchNative("/profilestats/following", "GET", JSON.stringify({}))
        console.log(result)
        setFollowingNumber(result.followers.length)
    }

    React.useEffect(()=>{
        console.log("use effect")

        retriveImage()
        getAll()
        getFollowers()
        getFollowing()
    },[])

    const retriveImage = async () => {
        const { url } = await serverFetchNative("/update/profileimage", "GET", JSON.stringify({}))
        // const { url } = await fetch("/update/profileimage")
        //     .then(res => res.json())
        
        if (url.url == "not found") {
            setLoadingPicture(false)            
           return
        }
        
        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
        
        setIsLoading(false)
        setLoadingPicture(false)
    }

    const logout= async ()=>{
        const result = await serverFetchNative("/auth/logout", "GET", JSON.stringify({}))
        props.setAutorizzato(false)
        props.setConfigurato(true)
        history.push("/signin")

        // fetch("/auth/logout",{
        //     method: "GET"
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     props.setAutorizzato(false)
        //     props.setConfigurato(true)
        //     history.push("/signin")
        // })
        // .catch(err=>console.log(err))
    }

    return(
        <IonPage>
            <BTHeader title="Your profile" />
            <IonContent>
                {
                    isLoading === true &&
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
                    isLoading === false &&
                    <>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6" className="text-center">
                                    <IonText><h1>{username}</h1></IonText>
                                </IonCol>
                                <IonCol size="6">
                                    {
                                        loadingPicture === true &&
                                        <IonGrid className="landing-half">
                                            <IonRow>
                                                <IonCol size="12" className="text-center">
                                                    <IonSpinner name="crescent" /><br />
                                                    <IonText>Loading profile picture...</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    }
                                    {
                                        loadingPicture === false &&
                                        <IonCard button onClick={()=>setModal(3)} className='profile-pic'>
                                            <IonImg src={path} alt="picture" />
                                        </IonCard>
                                    }
                                </IonCol>
                                <IonCol size="6" className="text-center" onClick={()=>history.push("/followers")}>
                                    <IonText><h1>{followersNumber}</h1><br />followers</IonText>
                                </IonCol>
                                <IonCol size="6" className="text-center" onClick={()=>history.push("/following")}>
                                    <IonText><h1>{followingNumber}</h1><br />followed</IonText>
                                </IonCol>
                                <IonCol size="12">
                                    <IonButton
                                        className="text-left"
                                        expand="block"
                                        onClick={() =>setActionsheet(true) }
                                    >
                                        Settings
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                        <IonModal trigger="modalPersonalInformation" isOpen={modal === 0}>
                            <ProfilePersonalInfo setModal={setModal} />
                        </IonModal>
                        <IonModal trigger="modalEmail" isOpen={modal === 1}>
                            <ProfileEmail setModal={setModal} />
                        </IonModal>
                        <IonModal trigger="modalPassword" isOpen={modal === 2}>
                            <ProfilePassword setModal={setModal} />
                        </IonModal>
                        <IonModal trigger="modalPicture" isOpen={modal === 3}>
                            <ProfilePictures setModal={setModal} />
                        </IonModal>
                        <IonModal trigger="modalPrivacy" isOpen={modal===4}>
                            <ProfilePrivacy setModal={setModal} />
                        </IonModal>
                        <IonAlert
                            isOpen={modal === 5}
                            onDidDismiss={()=>setModal(-1)}
                            header="Are you sure?"
                            message="Do you really want to logout?"
                            buttons={[{
                                text: "Close",
                                role: "cancel"
                            },{
                                text: "Persist",
                                handler: ()=>logout()
                            }]}
                        />
                        <IonActionSheet 
                            isOpen={actionsheet}
                            onDidDismiss={()=>setActionsheet(false)}
                            header={"User settings"}
                            buttons={items}
                        />
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default Profile