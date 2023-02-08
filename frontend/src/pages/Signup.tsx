import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router';
import SignuUpPersonal from '../components/SignUpPersonal';
import placeholder_logo from '../pictures/placeholder-logo.png'
import '../theme/buddy-traveler.css'
import SignUpLooking from '../components/SignUpLooking';
import SignUpCountries from '../components/SignUpCountries';
import SignUpGroups from '../components/SignUpGroups';
import SignUpDone from '../components/SignUpDone';
import serverFetchNative from '../logic/serverFetchNative';

const Signup: React.FC=()=>{
    const [phase,setPhase]=React.useState(0)
    const [name,setName]=React.useState("")
    const [surname,setSurname]=React.useState("")
    const [username,setUsername]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [placesArray,setPlacesArray]=React.useState([""])
    const [countriesArray,setCountriesArray]=React.useState([""])
    const [groupsArray,setGroupsArray]=React.useState([""])
    const [state,setState]=React.useState("pending")
    const history=useHistory()

    const signUp = async () => {
        const result = await serverFetchNative("/auth/signup", "POST", JSON.stringify({ name, surname, username, email, password, placesArray, countriesArray, groupsArray }))
        console.log(result)
        setState(result.stato)
    }

    React.useEffect(()=>{
        if (phase===4){
            signUp()
            // fetch("/auth/signup",{
            //     method: "POST",
            //     headers:{
            //         "Content-Type": "Application/JSON"
            //     },
            //     body: JSON.stringify({
            //         name,
            //         surname,
            //         username,
            //         email,
            //         password,
            //         placesArray,
            //         countriesArray,
            //         groupsArray
            //     })
            // })
            // .then(result=>result.json())
            // .then(result=>{
            //     console.log(result)
            //     setState(result.stato)
            // })
            // .catch(err=>console.log(err))
        }
    },[phase])

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid className="landing-top">
                    <IonRow>
                        <IonCol size="6" offset="3">
                            <IonImg src={placeholder_logo} className="img-round" />
                        </IonCol>
                        <IonCol size="12" className="text-center">
                            <IonText><h1>Sign up at Buddy Traveler</h1></IonText>
                        </IonCol>
                        {
                            phase === 0 &&
                            <SignuUpPersonal setPhase={setPhase} setName={setName} setSurname={setSurname} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} />
                        }
                        {
                            phase === 1 &&
                            <SignUpLooking setPhase={setPhase} setPlacesArray={setPlacesArray} />
                        }
                        {
                            phase === 2 &&
                            <SignUpCountries setPhase={setPhase} setPlaces={setCountriesArray} />
                        }
                        {
                            phase === 3 &&
                            <SignUpGroups setPhase={setPhase} setGroups={setGroupsArray} />
                        }
                        {
                            phase === 4 &&
                            <SignUpDone state={state} />
                        }
                        {
                            phase !== 4 &&
                            <IonCol size="12">
                                <IonButton color="secondary" expand="block" fill="clear" onClick={()=>history.push("/signin")}>Already a user?</IonButton>
                            </IonCol>
                        }
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Signup