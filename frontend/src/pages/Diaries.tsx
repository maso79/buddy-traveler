import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonItem, IonItemDivider, IonList, IonModal, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import { add } from 'ionicons/icons';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import CardDiaryList from '../components/CardDiaryList';
import CardNoDiaries from '../components/CardNoDiaries';
import DiaryCreate from '../components/DiaryCreate';
import DiaryView from '../components/DiaryView';
import placeholder from '../pictures/placeholder.png'

const Diaries: React.FC=()=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [diaries,setDiaries]=React.useState([{_id:"", name: "", destination: "", startDate: "", endDate: "", imageName: placeholder}])
    const [diariesNumber,setDiariesNumber]=React.useState(0)
    const [modal,setModal]=React.useState(-1)
    const [modalDiaries, setModalDiaries] = React.useState("null")
 
    React.useEffect(()=>{
        console.log("use effect")

        fetch("/diary/diaries",{
            method: "GET"
        })
        .then(result=>result.json())
        .then(result=>{
            if (result.diaries){
                // for (let i=0;i<result.diaries.length;i++){
                //     fetch("/")
                // }

                console.log(diaries)

                setDiaries(result.diaries)
                setDiariesNumber(result.diaries.length)
                setIsLoading(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })

    },[modal])

    return(
        <IonPage>
            <BTHeader title="Your diaries" />
            <IonContent>
                {
                    isLoading === true &&
                    <IonGrid className="landing-half">
                        <IonRow>
                            <IonCol size="12" className="text-center">
                                <IonSpinner name="crescent" /><br />
                                <IonText>Loading your data...</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
                {
                    isLoading === false &&
                    <>
                        {
                            diariesNumber === 0 &&
                            <>
                                <IonImg className="spazio-lato" src={placeholder} alt="no diaries" />
                                <div className="text-center">
                                    <IonText className="text-muted spazio-lato">No diaries here</IonText>
                                </div>
                                <br />
                                <IonItemDivider  />
                                <CardNoDiaries />
                            </>
                        }
                        {
                            diariesNumber > 0 &&
                            <IonList>
                                {
                                        diaries.map((diary, i) => (
                                        <CardDiaryList key={i} _id={diary._id} name={diary.name} destination={diary.destination} startDate={diary.startDate} endDate={diary.endDate} thumbnail={diary.imageName} setModalDiaries={setModalDiaries} />
                                    ))
                                }
                            </IonList>
                        }
                        {
                            diariesNumber > 0 &&

                            diaries.map((diary, i) => (
                                <IonModal trigger={""+diary._id} isOpen={modalDiaries === diary._id} key={i}>
                                    <DiaryView diaryId={diary._id} title={diary.name} setModal={setModalDiaries}/>
                                </IonModal>
                            ))
                        }
                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                            <IonFabButton onClick={()=>setModal(0)}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>

                        <IonModal trigger="modalDiaryCreate" isOpen={modal === 0}>
                            <DiaryCreate setModal={setModal} />
                        </IonModal>
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default Diaries