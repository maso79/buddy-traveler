import { IonCard, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import { atCircle, camera, key, lockClosed } from 'ionicons/icons';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import ProfileEmail from '../components/ProfileEmail';
import ProfilePassword from '../components/ProfilePassword';
import ProfilePersonalInfo from '../components/ProfilePersonalInfo';
import ProfilePictures from '../components/ProfilePicture';
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
]

const Profile: React.FC=()=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [name,setName]=React.useState("")
    const [modal,setModal]=React.useState(-1)

    React.useEffect(()=>{
        console.log("use effect")

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
                                    <IonCard button onClick={()=>setModal(3)}>
                                        <IonImg src={placeholder_profile} alt="picture" />
                                    </IonCard>
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
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default Profile