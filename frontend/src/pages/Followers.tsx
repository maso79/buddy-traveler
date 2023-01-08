import { IonCol, IonContent, IonGrid, IonImg, IonItem, IonList, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import placeholder from '../pictures/placeholder.png'

const Followers: React.FC=()=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [followers,setFollowes]=React.useState([{
        id_user: "",
        username: "",
        name: "",
        surname: ""
    }])

    React.useEffect(()=>{
        fetch("/profilestats/followers",{
            method: "GET",
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            setFollowes(result.followers)
            setIsLoading(false)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <IonPage>
            <BTHeader title="Followers" />
            <IonContent>
                {
                    isLoading === true &&
                    <IonGrid className="landing-half">
                        <IonRow>
                            <IonCol size="12" className="text-center">
                                <IonSpinner name="crescent" /><br />
                                <IonText>Loading...</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
                {
                    isLoading === false &&
                    <IonList>
                        {
                            followers.map((item,i)=>(
                                <IonItem button key={i}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2">
                                                <IonImg src={placeholder} alt="placeholder" />
                                            </IonCol>
                                            <IonCol size="10"><IonText>{item.username} <br /> <small className="text-muted">{item.name} {item.surname}</small></IonText></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            ))
                        }
                    </IonList>
                }
            </IonContent>
        </IonPage>
    )
}

export default Followers