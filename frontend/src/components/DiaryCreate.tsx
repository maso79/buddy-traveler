import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonToast } from '@ionic/react';
import * as React from 'react';
import BTHeaderModal from './BTHeaderModal';

const DiaryCreate: React.FC<{ setModal:Function }>=(props)=>{
    const [name,setName]=React.useState("")
    const [destination,setDestination]=React.useState("")
    const [startDate,setStartDate]=React.useState("")
    const [endDate,setEndDate]=React.useState("")
    const [toastSuccess,setToastSuccess]=React.useState(false)
    const [toastError,setToastError]=React.useState(false)
    const [toastErrorText,setToastErrorText]=React.useState("")

    const create=()=>{
        fetch("/diary/createone",{
            method: "POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify({
                name,
                destination,
                startDate,
                endDate
            })
        })
        .then(result=>result.json())
        .then(result=>{
            if (result.stato === "success") {
                setToastSuccess(true)
                setTimeout(()=>props.setModal(-1),2050)
            }
            else{
                setToastErrorText("Damn, something went wrong. Check the form or try again later")
                setToastError(true)
            }
        })
        .catch(err=>{
            console.log(err)
            setToastErrorText("Damn, something went wrong. Check the form or try again later")
            setToastError(true)
        })
    }

    return(
        <IonPage>
           <BTHeaderModal title="Crate a new diary" setModal={props.setModal} />
           <IonContent>
               <IonGrid>
                   <IonRow>
                        <IonCol size="12">
                            <IonItem>
                               <IonLabel position="floating">Diary name</IonLabel>
                               <IonInput value={name} onIonChange={e=>setName(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <IonItem>
                               <IonLabel position="floating">Destination</IonLabel>
                               <IonInput value={destination} onIonChange={e=>setDestination(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel className="spazio-lato">Start date</IonLabel>
                            <IonDatetime
                                firstDayOfWeek={1}
                                value={startDate} onIonChange={e=>setStartDate(e.detail.value!)} 
                            />
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel className="spazio-lato">End date</IonLabel>
                            <IonDatetime
                                firstDayOfWeek={1}
                                value={endDate} onIonChange={e=>setEndDate(e.detail.value!)} 
                            />
                       </IonCol>
                        <IonCol size="12">
                           <IonButton color="primary" expand="block" onClick={create}>Create diary</IonButton>
                       </IonCol>
                       <IonCol size="12">
                           <IonButton color="primary" fill="clear" expand="block" onClick={()=>props.setModal(-1)}>Close</IonButton>
                       </IonCol>
                   </IonRow>
               </IonGrid>
               <IonToast
                    isOpen={toastSuccess}
                    onDidDismiss={()=>setToastSuccess(false)}
                    duration={2000}
                    color="success"
                    header="Success!"
                    message={"The diary \""+name+"\" was created successfully"}
                />
                <IonToast
                    isOpen={toastError}
                    onDidDismiss={()=>setToastError(false)}
                    duration={4000}
                    color="danger"
                    header="Error"
                    message={toastErrorText}
                />
           </IonContent>
        </IonPage>
    )
}

export default DiaryCreate