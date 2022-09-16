import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonSearchbar } from '@ionic/react';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import PeopleRecent from '../components/PeopleRecent';
import PeopleSuggestions from '../components/PeopleSuggestions';

const People: React.FC=()=>{
    const [suggestions,setSuggestions]=React.useState([{profilePicture: "", username: ""}])
    const [query,setQuery]=React.useState("")

    React.useEffect(()=>{
        setSuggestions([])
    },[])

    const lookForPeople=async ()=>{
        const result=await fetch("/people/find",{
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({letters: query})
        })
        .then(result=>result.json())
        .then(result=>{
            setSuggestions(result.stato)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <IonPage>
            <BTHeader title="People" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonSearchbar placeholder="Search for people" value={query} onIonChange={e=>{
                                setSuggestions([])
                                lookForPeople()
                                setQuery(e.detail.value!)
                            }} />
                            {
                                suggestions.length > 0 && query!=="" &&
                                <PeopleSuggestions suggestions={suggestions} />
                            }
                        </IonCol>
                        <IonCol size="12">
                            <PeopleRecent />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default People