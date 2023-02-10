import { IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonModal, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import { add, calendar, location } from 'ionicons/icons';
import * as React from 'react';
import BTHeader from '../components/BTHeader';
import CardDiaryList from '../components/CardDiaryList';
import CardNoDiaries from '../components/CardNoDiaries';
import DiaryCreate from '../components/DiaryCreate';
import DiaryView from '../components/DiaryView';
import navbarIcons from '../logic/navbarIcons';
import serverFetchNative from '../logic/serverFetchNative';
import placeholder from '../pictures/placeholder.png'

const Diaries: React.FC=()=>{
    const [isLoading,setIsLoading]=React.useState(true)
    const [diaries,setDiaries]=React.useState([{_id:"", name: "", destination: "", startDate: "", endDate: "", imageName: placeholder}])
    const [diariesNumber,setDiariesNumber]=React.useState(0)
    const [modal,setModal]=React.useState(-1)
    const [modalDiaries, setModalDiaries] = React.useState("null")
    const [update,setUpdate]=React.useState(0)
    
    const getDiaries = async () => {
        const result = await serverFetchNative("/diary/diaries", "GET", JSON.stringify({}))
        if(result.diaries) {
            console.log(diaries)

            setDiaries(result.diaries)
            setDiariesNumber(result.diaries.length)
            setIsLoading(false)
        }
    }

    React.useEffect(()=>{
        console.log("use effect")

        getDiaries()
        navbarIcons.setFill("diaries")

    },[modal, update])

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
                        <h1 className='spazio-lato landing bold bt-header'>My diaries</h1>
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
                            <IonCard className='diaries-card'>
                                <IonCardContent>
                                    <IonItemDivider>
                                        <IonLabel>2023</IonLabel>
                                    </IonItemDivider>
                                    {
                                            diaries.map((diary, i) => (
                                            <div key={i}>
                                                
                                                    {
                                                        i%2===0 &&
                                                        <div className='spazio-lato diary-card bt-padding-top'>
                                                            <IonImg src={placeholder} className="diary-card-picture diary-card-left"  />
                                                            <div className="diary-card-content spazio-lato">
                                                                <h4 className='bold'>{diary.name}</h4>
                                                                <h5>Location: {diary.destination}</h5>
                                                                <small>From {new Date(diary.startDate).toLocaleString("it-IT",{dateStyle: "short"})} to {new Date(diary.endDate).toLocaleString("it-IT",{dateStyle: "short"})}</small>
                                                            </div>
                                                        </div>

                                                    }
                                                    {
                                                        i%2===1 &&
                                                        <>
                                                            <IonCol size='6'>
                                                                <IonGrid>
                                                                    <IonRow>
                                                                        <IonCol size='12'>
                                                                            <IonText><h3>{diary.name}</h3></IonText>
                                                                        </IonCol>
                                                                        <IonCol size='12'>
                                                                            <IonText><h4>{diary.destination}</h4></IonText>
                                                                        </IonCol>
                                                                        <IonCol size='12'>
                                                                            <IonText>From {new Date(""+diary.startDate).toLocaleDateString()} to {new Date(""+diary.endDate).toLocaleDateString()}</IonText>
                                                                        </IonCol>
                                                                    </IonRow>
                                                                </IonGrid>
                                                            </IonCol>
                                                            <IonCol size='6'>
                                                                <IonImg src={diary.imageName !== "" ? ""+diary.imageName : placeholder} className="diary-card-picture" />
                                                            </IonCol>
                                                        </>

                                                    }
                                                
                                            </div>
                                        ))
                                    }
                                </IonCardContent>
                            </IonCard>
                        }
                        {
                            diariesNumber > 0 &&

                            diaries.map((diary, i) => (
                                <IonModal trigger={""+diary._id} isOpen={modalDiaries === diary._id} key={i}>
                                    <DiaryView diaryId={diary._id} title={diary.name} setModal={setModalDiaries} update={update} setUpdate={setUpdate} />
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