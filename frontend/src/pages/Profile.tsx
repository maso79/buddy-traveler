import { IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import { atCircle, key, lockClosed } from 'ionicons/icons';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import placeholder_profile from '../pictures/placeholder-profile.png'

const items=[
    {
        title: "Your personal data",
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
]

const Profile: React.FC=()=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [name,setName]=React.useState("")

    React.useEffect(()=>{
        fetch("/profile/all",{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
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
                                <IonImg src={placeholder_profile} alt="picture" />
                            </IonCol>
                            <IonCol size="12" className="text-center">
                                <IonText><h1>Hi, {name}</h1></IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonList inset lines="full">
                        {
                            items.map((item,i)=>(
                                <IonItem key={i} button>
                                    <IonIcon icon={item.icon} size="large" slot="start" />
                                    <IonText>{item.title}</IonText>
                                </IonItem>
                            ))
                        }
                    </IonList>
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default Profile