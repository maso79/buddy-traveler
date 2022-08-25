import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
import path from '../pictures/placeholder.png'
import { search } from 'ionicons/icons';

const DiaryEdit: React.FC<{ setModal: Function, diaryId: String }>=(props)=>{
    const [diary,setDiary]=React.useState({
        _id: "",
        destination: "",
        name: "",
        startDate: "",
        endDate: "",
        userId: ""
    })
    const [loading,setLoadig]=React.useState(true)
    const [name,setName]=React.useState("")
    const [destination,setDestionation]=React.useState("")
    const [startDate,setStartDate]=React.useState("")
    const [endDate,setEndDate]=React.useState("")

    React.useEffect(()=>{
        fetch(`/diary/getdiary/${props.diaryId}`,{
            method: "GET",
        })
        .then(result=>result.json())
        .then(result=>{
            console.log(result)
            setDiary(result.diary)
            setName(result.diary.name)
            setDestionation(result.diary.destination)
            setStartDate(result.diary.startDate)
            setEndDate(result.diary.endDate)
            setLoadig(false)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <IonPage>
            <BTHeaderModal setModal={props.setModal} title="Diary settings" />
            <IonContent>
                {
                    loading === true &&
                    <IonGrid className="landing-half">
                        <IonRow>
                            <IonCol size="12" className="text-center">
                                <IonSpinner name="crescent" /><br />
                                <IonText>Loading diary...</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
                {
                    loading === false &&
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6" offset="3" className="text-center">
                                <IonImg src={path} alt="picture" />
                            </IonCol>
                            <IonCol size="12" className="text-center">
                                <IonText>Choose a picture</IonText>
                                <br /><br />
                                <form>
                                    <input type="file" name="profileImage" id="" />
                                    <br /><br />
                                </form>
                            </IonCol>
                            <IonCol size="12">
                                <IonItemDivider />
                            </IonCol>
                            <IonCol size="12">
                                <IonItem>
                                    <IonLabel position="floating">Diary name</IonLabel>
                                    <IonInput value={name} onIonChange={e=>setName(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                            <IonCol size="10">
                                <IonItem>
                                    <IonLabel position="floating">Destination</IonLabel>
                                    <IonInput value={destination} onIonChange={e=>setDestionation(e.detail.value!)} />
                                </IonItem>
                            </IonCol>
                            <IonCol size="2">
                                <IonButton color="primary">
                                    <IonIcon icon={search} />
                                </IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonLabel>Start date</IonLabel>
                                <br />
                                {
                                    startDate !== "" &&
                                    <IonText className="text-muted">Selected date: {new Date(""+startDate).toLocaleDateString()}</IonText>
                                }
                                <IonButton color="light" expand="block">Select date</IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonLabel>End date</IonLabel>
                                <br />
                                {
                                    endDate !== "" &&
                                    <IonText className="text-muted">Selected date: {new Date(""+endDate).toLocaleDateString()}</IonText>
                                }
                                <IonButton color="light" expand="block">Select date</IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonItemDivider />
                            </IonCol>
                            <IonCol size="12">
                                <IonButton color="primary" expand="block">Save settings</IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonButton color="light" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
            </IonContent>
        </IonPage>
    )
}

export default DiaryEdit