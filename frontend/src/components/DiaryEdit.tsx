import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonModal, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';
//import path from '../pictures/placeholder.png'
import { search } from 'ionicons/icons';
import placeholder_profile from '../pictures/placeholder.png'
import DateSelect from './DateSelect';

const DiaryEdit: React.FC<{ setModal: Function, diaryId: String, update: number, setUpdate: Function }>=(props)=>{
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
    const [endDate, setEndDate] = React.useState("")
    const [path,setPath]=React.useState(placeholder_profile)
    const [modalStartDate,setModalStartDate]=React.useState(false)
    const [modalEndDate,setModalEndDate]=React.useState(false)

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
        getThumbnail()
    },[])

    const getThumbnail = async () => {
        const data = { diaryId: props.diaryId }
        const { url } = await fetch("/update/showdiaryimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        
        if (url.url == "not found") {           
           return
        }
        
        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
    }

    const uploadThumbnail = async () => {
        const file = document.querySelector("input").files[0]
        console.log(file)
        const data = { diaryId: props.diaryId }
    
        const { url } = await fetch("/update/diaryimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: file
        })

        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
        props.setUpdate(props.update+1)
    }

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
                                    <input type="file" name="profileImage" id="" onChange={uploadThumbnail}/>
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
                                <IonButton color="light" expand="block" onClick={()=>setModalStartDate(true)}>Select date</IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonLabel>End date</IonLabel>
                                <br />
                                {
                                    endDate !== "" &&
                                    <IonText className="text-muted">Selected date: {new Date(""+endDate).toLocaleDateString()}</IonText>
                                }
                                <IonButton color="light" expand="block" onClick={()=>setModalEndDate(true)}>Select date</IonButton>
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

                <IonModal isOpen={modalStartDate} trigger="modalStartDate" onDidDismiss={()=>setModalStartDate(false)}>
                    <DateSelect date={startDate} setDate={setStartDate} setModal={setModalStartDate} />
                </IonModal>
                <IonModal isOpen={modalEndDate} trigger="modalEndDate" onDidDismiss={()=>setModalEndDate(false)}>
                    <DateSelect date={endDate} setDate={setEndDate} setModal={setModalEndDate} />
                </IonModal>
            </IonContent>
        </IonPage>
    )
}

export default DiaryEdit