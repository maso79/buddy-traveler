import { IonAlert, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import { atCircle, camera, key, lockClosed, logOut, shield } from 'ionicons/icons';
import * as React from 'react';
import { useHistory } from 'react-router';
import BTHeader from '../components/BTHeader';
import ProfileEmail from '../components/ProfileEmail';
import ProfilePassword from '../components/ProfilePassword';
import ProfilePersonalInfo from '../components/ProfilePersonalInfo';
import ProfilePictures from '../components/ProfilePicture';
import ProfilePrivacy from '../components/ProfilePrivacy';
import placeholder_profile from '../pictures/placeholder-profile.png'

const items=[
    {
        title: "Your personal information",
        icon: lockClosed
    },
    {
        title: "Your email",
        icon: atCircle
    },
    {
        title: "Your password",
        icon: key
    },
    {
        title: "Profile picture",
        icon: camera
    },
    {
        title: "Privacy",
        icon: shield
    },
    {
        title: "Logout",
        icon: logOut
    }
]

const Profile: React.FC<{ setAutorizzato: Function, setConfigurato: Function }>=(props)=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [name,setName]=React.useState("")
    const [modal,setModal]=React.useState(-1)
    const [path,setPath]=React.useState(placeholder_profile)
    const [loadingPicture,setLoadingPicture]=React.useState(true)
    const history=useHistory()

    React.useEffect(()=>{
        console.log("use effect")

        retriveImage()

        fetch("/profile/all",{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            if (result.user.email){
                setName(result.user.name)
                setIsLoading(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

    const retriveImage = async () => {
        const { url } = await fetch("/update/profileimage")
            .then(res => res.json())
        
        if (url.url == "not found") {
            setLoadingPicture(false)            
           return
        }
        
        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
        
        setIsLoading(false)
        setLoadingPicture(false)
    }

    const logout=()=>{
        fetch("/auth/logout",{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            props.setAutorizzato(false)
            props.setConfigurato(true)
            history.push("/signin")
        })
        .catch(err=>console.log(err))
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
                                <IonCol size="6" offset="3">
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
                                        <IonCard button onClick={()=>setModal(3)}>
                                            <IonImg src={path} alt="picture" />
                                        </IonCard>
                                    }
                                </IonCol>
                                <IonCol size="12" className="text-center">
                                    <IonText><h1>Hi, {name}</h1></IonText>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonList inset lines="full">
                            {
                                items.map((item,i)=>(
                                    <IonItem key={i} button onClick={()=>setModal(i)}>
                                        <IonIcon icon={item.icon} size="large" slot="start" />
                                        <IonText>{item.title}</IonText>
                                    </IonItem>
                                ))
                            }
                        </IonList>

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
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default Profile