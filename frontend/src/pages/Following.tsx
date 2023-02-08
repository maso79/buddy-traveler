import { IonCol, IonContent, IonGrid, IonImg, IonItem, IonList, IonModal, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import UserView from '../components/UserView';
import serverFetchNative from '../logic/serverFetchNative';
import placeholder from '../pictures/placeholder.png'

const Followers: React.FC=()=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [modalUser,setModalUser]=React.useState(-1)
    const [viewUserId,setViewUserId]=React.useState("")
    const [viewUserUsername,setViewUserUsername]=React.useState("")
    const [followers,setFollowes]=React.useState([{
        id_user: "",
        username: "",
        name: "",
        surname: ""
    }])

    const getFollowingStats = async () => {
        const result = await serverFetchNative("/profilestats/following", "GET", JSON.stringify({}))
        console.log(result)
        setFollowes(result.followers)
        setIsLoading(false)
    }

    React.useEffect(()=>{
        getFollowingStats()
        // fetch("/profilestats/following",{
        //     method: "GET",
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     console.log(result)
        //     setFollowes(result.followers)
        //     setIsLoading(false)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },[])

    return(
        <IonPage>
            <BTHeader title="Following" />
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
                                <IonItem button key={i} onClick={()=>{
                                    setViewUserId(item.id_user)
                                    setViewUserUsername(item.username)
                                    setModalUser(0)
                                }}>
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

            <IonModal isOpen={modalUser===0}>
                <UserView setModal={setModalUser} userId={viewUserId} userUsername={viewUserUsername} />
            </IonModal>
        </IonPage>
    )
}

export default Followers