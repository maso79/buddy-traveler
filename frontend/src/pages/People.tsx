import { IonCol, IonContent, IonGrid, IonModal, IonPage, IonRow, IonSearchbar } from '@ionic/react';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import PeopleRecent from '../components/PeopleRecent';
import PeopleSuggestions from '../components/PeopleSuggestions';
import UserView from '../components/UserView';

const People: React.FC=()=>{
    const [suggestions,setSuggestions]=React.useState([{id: "",profilePicture: "", username: ""}])
    const [query,setQuery]=React.useState("")
    const [modalUser,setModalUser]=React.useState(false)
    const [userUsername,setUserUsername]=React.useState("")
    var searchTimeout=setTimeout(()=>{},100)

    React.useEffect(()=>{
        setSuggestions([])
        clearTimeout(searchTimeout)
        searchTimeout=setTimeout(async ()=>{
            if (query.length>=3){
                const result=await fetch("/people/find",{
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/JSON"
                    },
                    body: JSON.stringify({letters: query})
                })
                .then(result=>result.json())
                .then(result=>{
                    console.log(result.stato)
                    setSuggestions(result.stato)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },250)
    },[query])

    return(
        <IonPage>
            <BTHeader title="People" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonSearchbar placeholder="Search for people" value={query} onIonChange={e=>{
                                setQuery(e.detail.value!)
                            }} />
                            {
                                suggestions.length > 0 && query!=="" &&
                                <PeopleSuggestions suggestions={suggestions} setUserIdView={setUserUsername} setModalUserView={setModalUser} />
                            }
                        </IonCol>
                        <IonCol size="12">
                            <PeopleRecent />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonModal trigger="modalUser" isOpen={modalUser}>
                <UserView setModal={setModalUser} userUsername={userUsername} />
            </IonModal>
        </IonPage>
    )
}

export default People