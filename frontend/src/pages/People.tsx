import { IonCol, IonContent, IonGrid, IonLabel, IonModal, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import PeopleRecent from '../components/PeopleRecent';
import PeopleSuggestions from '../components/PeopleSuggestions';
import UserView from '../components/UserView';
import serverFetchNative from '../logic/serverFetchNative';

const People: React.FC=()=>{
    const [suggestions,setSuggestions]=React.useState([{_id: "",profilePicture: "", username: ""}])
    const [query,setQuery]=React.useState("")
    const [modalUser,setModalUser]=React.useState(-1)
    const [userUsername,setUserUsername]=React.useState("")
    const [userId,setUserId]=React.useState("")
    var searchTimeout=setTimeout(()=>{},100)

    const findPeople = async () => {
        const result = await serverFetchNative("/people/find", "POST", JSON.stringify({letters: query}))
        console.log(result.stato)
        setSuggestions(result.stato)
    }

    React.useEffect(()=>{
        setSuggestions([])
        clearTimeout(searchTimeout)
        searchTimeout=setTimeout(async ()=>{
            if (query.length>=3){
                findPeople()
                // const result=await fetch("/people/find",{
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "Application/JSON"
                //     },
                //     body: JSON.stringify({letters: query})
                // })
                // .then(result=>result.json())
                // .then(result=>{
                //     console.log(result.stato)
                //     setSuggestions(result.stato)
                // })
                // .catch(err=>{
                //     console.log(err)
                // })
            }
        },250)
    },[query])

    return(
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size='12'>
                            <h1 className="bt-header bold spazio-lato">Look for the right one.</h1>
                        </IonCol>
                        <IonCol size="12">
                            <IonSearchbar placeholder="Search for people" value={query} onIonChange={e=>{
                                setQuery(e.detail.value!)
                            }} />
                            {
                                suggestions.length > 0 && query!=="" &&
                                <PeopleSuggestions suggestions={suggestions} setUserIdView={setUserId} setUserUsername={setUserUsername} setModalUserView={setModalUser} />
                            }
                        </IonCol>
                        <IonCol size='12' className='bt-space-side'>
                            <IonSegment value='recent' mode='ios'>
                                <IonSegmentButton value='recent'>
                                    <IonLabel>Recent</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value='suggestions'>
                                    <IonLabel>Suggestions</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonCol>
                        <IonCol size="12">
                            <PeopleRecent setUserIdView={setUserId} setUserUsername={setUserUsername} setModalUserView={setModalUser}/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonModal trigger="modalUser" isOpen={modalUser===1}>
                <UserView setModal={setModalUser} userUsername={userUsername} userId={userId} />
            </IonModal>
        </IonPage>
    )
}

export default People