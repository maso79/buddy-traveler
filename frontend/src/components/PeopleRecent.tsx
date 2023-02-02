import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonItem, IonList, IonRow, IonText } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router';
import serverFetchNative from '../logic/serverFetchNative';
import placeholder from '../pictures/placeholder.png'

const PeopleRecent: React.FC<{ setUserIdView: Function, setUserUsername: Function, setModalUserView: Function }>=(props)=>{
    const [recentUsers,setRecentUsers]=React.useState([{_id: "", username: ""}])
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
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Recently Viewed People</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
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
                                <IonList>
                                    {                                    
                                    recentUsers.map(user=>(
                                        <IonItem button onClick={()=>{
                                            // props.setUserIdView(user._id)
                                            // props.setUserUsername(user.username)
                                            // props.setModalUserView(1)

                                            history.push(`/people/${user.username}&${user._id}`)
                                        }}>{user.username}</IonItem>
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