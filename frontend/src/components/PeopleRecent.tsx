import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonList, IonRow, IonText } from '@ionic/react';
import { close } from 'ionicons/icons';
import * as React from 'react';
import { useHistory } from 'react-router';
import serverFetchNative from '../logic/serverFetchNative';
import placeholder from '../pictures/placeholder.png'

const PeopleRecent: React.FC<{ setUserIdView: Function, setUserUsername: Function, setModalUserView: Function }>=(props)=>{
    const [recentUsers,setRecentUsers]=React.useState([{_id: "", username: "", name: "", surname: "", imageName: ""}])
    const history=useHistory()

    const recentSearch = async () => {
        const result = await serverFetchNative("/people/recentsearch", "GET", JSON.stringify({}))
        console.log(result)
        setRecentUsers(result.stato)
    }

    React.useEffect(()=>{
        console.log("prova")
        recentSearch()
        // fetch("/people/recentsearch",{
        //     method: "GET"
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     console.log(result)
        //     setRecentUsers(result.stato)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },[])

    return(
        <IonCard className='people-recent-card'>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size='12'>
                            <h3 className='bold'>Recent</h3>
                        </IonCol>
                        <IonCol size="12">
                            {
                                recentUsers.length===0 &&
                                <>
                                    <IonImg src={placeholder} />
                                    <IonText>No people to show. Start searching for people with the searchbar above</IonText>
                                </>
                            }
                            {
                                recentUsers.length > 0 &&
                                <IonList lines='none'>
                                    {                                    
                                    recentUsers.map((user,i)=>(
                                        <IonItem className='people-recent-card' key={i}>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol size='2' onClick={()=>history.push(`/people/${user.username}&${user._id}`)}>
                                                        <IonImg src={"https://buddytraveler-s3-bucket.s3.eu-central-1.amazonaws.com/"+user.imageName} className="bt-img-round" />
                                                    </IonCol>
                                                    <IonCol size='7' offset='1' onClick={()=>history.push(`/people/${user.username}&${user._id}`)}>
                                                        <IonText><h4>{user.username}</h4></IonText>
                                                        <IonText className='text-muted'> <small>{user.name} {user.surname}</small> </IonText>
                                                    </IonCol>
                                                    <IonCol size='2'>
                                                        <IonButton color={"light"} fill="clear">
                                                            <IonIcon icon={close} color="primary" />
                                                        </IonButton>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                    ))}

                                </IonList>
                            }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    )
}

export default PeopleRecent