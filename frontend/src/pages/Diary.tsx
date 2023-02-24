import * as React from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { add, business, calendar, camera, checkbox, cog, dice, home, location, newspaper, people } from 'ionicons/icons';
import DiarySegmentActivites from '../components/DiarySegmentActivities';
import DiaryEdit from '../components/DiaryEdit';
import ActivityCreate from '../components/ActivityCreate';
import placeholder_profile from '../pictures/placeholder.png'
import serverFetchNative from '../logic/serverFetchNative';
import { useLocation } from 'react-router';

const Diary: React.FC=()=>{
    const [diary,setDiary]=React.useState({
        _id: "",
        destination: "",
        name: "",
        startDate: "",
        endDate: "",
        userId: ""
    })
    const [segment,setSegment]=React.useState("activities")
    const [modal,setModal]=React.useState(-1)
    const [loading, setLoadig] = React.useState(true)
    const [path,setPath]=React.useState(placeholder_profile)
    const [updateActivities,setUpdateActivities]=React.useState(0)
    const [activitiesNumber,setActivitiesNumber]=React.useState(0)
    const [diaryId,setDiaryId]=React.useState("")
    const [title, setTitle] = React.useState("")
    const [update,setUpdate]=React.useState(0)
    const currentLocation=useLocation()
    const options={
        initialSlide: 0,
        speed: 400
    }

    const getDiary = async (id) => {
        const result = await serverFetchNative(`/diary/getdiary/${id}`, "GET", JSON.stringify({}))
        console.log(result)
        setDiary(result.diary)
        setLoadig(false)
    }

    React.useEffect(()=>{
        const url=currentLocation.pathname
        const diaryId=url.split("/")[2]
        console.log(diaryId)
        setDiaryId(diaryId)

        getDiary(diaryId)
        getThumbnail(diaryId)
    },[update])

    const getThumbnail = async (id) => {
        const data = { diaryId: id }

        const { url } = await serverFetchNative("/update/showdiaryimage", "POST", JSON.stringify(data))
        
        console.log(url)
        if (url.url == "not found") {           
           return
        }
        
        const imageUrl = url.split('?')[0]
        setPath(imageUrl)
    }

    return(
        <IonPage>
            <IonContent>
                {
                    loading === true &&
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
                    loading === false &&
                    <>
                        <IonGrid>
                            <IonRow>
                                <IonCol size='12'>
                                    <h1 className='bold diary-title'>{diary.name}</h1>
                                </IonCol>
                                <IonCol size="12">
                                    <IonSlides pager={true} options={options}>
                                        <IonSlide>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol size='12'>
                                                        <IonImg src={path} className="diary-card-picture" alt="Placeholder" />
                                                        <IonCard className='diary-about'>
                                                            <IonCardContent className='diary-info'>
                                                                <IonGrid>
                                                                    <IonRow>
                                                                        <IonCol size='12'>
                                                                            <IonText>
                                                                                <h2>About this diary</h2>
                                                                            </IonText>
                                                                        </IonCol>
                                                                        <IonCol size='4' className='text-center'>
                                                                            <IonIcon icon={business} size="large" />
                                                                            <p>{diary.destination}</p>
                                                                        </IonCol>
                                                                        <IonCol size='4' className='text-center'>
                                                                            <IonIcon icon={camera} size="large" />
                                                                            <p>n pictures</p>
                                                                        </IonCol>
                                                                        <IonCol size='4' className='text-center'>
                                                                            <IonIcon icon={people} size="large" />
                                                                            <p>n buddies</p>
                                                                        </IonCol>
                                                                        <IonCol size='4' className='text-center'>
                                                                            <IonIcon icon={dice} size="large" />
                                                                            <p>n activities</p>
                                                                        </IonCol>
                                                                        <IonCol size='4' className='text-center'>
                                                                            <IonIcon icon={location} size="large" />
                                                                            <p>n places visited</p>
                                                                        </IonCol>
                                                                        <IonCol size='4' className='text-center'>
                                                                            <IonIcon icon={calendar} size="large" />
                                                                            <p>n days</p>
                                                                        </IonCol>
                                                                    </IonRow>
                                                                </IonGrid>
                                                            </IonCardContent>
                                                        </IonCard>

                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonSlide>
                                        <IonSlide>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol size='12'>

                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonSlide>
                                    </IonSlides>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                            <IonFabButton>
                                <IonIcon icon={add} />
                            </IonFabButton>
                            <IonFabList side="top">
                                <IonFabButton>
                                    <IonIcon icon={newspaper} onClick={()=>setModal(2)} />
                                </IonFabButton>
                                <IonFabButton>
                                    <IonIcon icon={people} />
                                </IonFabButton>
                                <IonFabButton>
                                    <IonIcon icon={checkbox} />
                                </IonFabButton>
                            </IonFabList>
                        </IonFab>

                        <IonModal trigger="modalSettings" isOpen={modal === 1}>
                            <DiaryEdit setModal={setModal} diaryId={diaryId} update={update} setUpdate={setUpdate} />
                        </IonModal>
                        <IonModal trigger="modalCreateActivity" isOpen={modal === 2}>
                            <ActivityCreate setModal={setModal} diaryId={diary._id} update={updateActivities} setUpdate={setUpdateActivities} />
                        </IonModal>
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default Diary