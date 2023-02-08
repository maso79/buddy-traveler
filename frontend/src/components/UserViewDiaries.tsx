import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonImg, IonItem, IonList, IonRow, IonText } from '@ionic/react';
import * as React from 'react';
import serverFetchNative from '../logic/serverFetchNative';
import placeholder from '../pictures/placeholder.png'

const UserViewDiaries: React.FC<{ userId: string, username: string }>=(props)=>{
    const [diaries,setDiaries]=React.useState([{
        _id: "",
        destination: "",
        endDate: "",
        imageName: "",
        name: "",
        startDate: "",
        userId: ""
    }])

    const retriveDiariesById = async () => {
        const result = await serverFetchNative("/diary/retrivediariesbyid", "POST", JSON.stringify({ userId: props.userId }))
        console.log(result)
        setDiaries(result.data)
    }

    React.useEffect(()=>{
        retriveDiariesById()
        // fetch("/diary/retrivediariesbyid",{
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "Application/JSON"
        //     },
        //     body: JSON.stringify({userId: props.userId})
        // })
        // .then(result=>result.json())
        // .then(result=>{
        //     console.log(result)
        //     setDiaries(result.data)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },[])

    return(
        <>
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <IonText><h3>{props.username}'s public diaries ({diaries.length})</h3></IonText>
                    </IonCol>
                        {
                            diaries.map(diary=>(
                                <IonCol size='6'>
                                    <IonCard>
                                        <IonImg src={placeholder} alt="placeholder" />
                                        <IonCardContent>
                                            <IonText><h1>{diary.name}</h1></IonText>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))
                        }
                </IonRow>
            </IonGrid>
        </>
    )
}

export default UserViewDiaries