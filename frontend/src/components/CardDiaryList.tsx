import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonText } from '@ionic/react';
import { calendar, location } from 'ionicons/icons';
import placeholder from '../pictures/placeholder.png'
import * as React from 'react';
import { useHistory } from 'react-router';

const CardDiaryList: React.FC<{ _id: String, name: String, destination: String, startDate: String, endDate: String, thumbnail: string , setModalDiaries: Function, i: number }>=(props)=>{
    const history=useHistory()

    return (
        <IonCard button onClick={()=>history.push("/diary/"+props._id)} className="diary-card">
            <IonGrid>
                <IonRow>
                    {
                        props.i % 2 === 0 &&
                        <>
                            <IonCol size='6'>
                                <IonImg src={props.thumbnail !== "" ? ""+props.thumbnail : placeholder} className="diary-card-picture" />
                            </IonCol>
                            <IonCol size='6'>
                                <IonText>
                                    <h2 className="bold">{props.name}</h2>
                                    <p>Location: {props.destination}</p>
                                    <small>From: {new Date(""+props.startDate).toLocaleDateString()}, <br /> to {new Date(""+props.endDate.toString()).toLocaleDateString()}</small>
                                </IonText>
                            </IonCol>
                        </>
                    }
                    {
                        props.i % 2 === 1 &&
                        <>
                            <IonCol size='6'>
                                <IonText>
                                    <h2 className="bold">{props.name}</h2>
                                    <p>Location: {props.destination}</p>
                                    <small>From: {new Date(""+props.startDate).toLocaleDateString()}, <br /> to {new Date(""+props.endDate.toString()).toLocaleDateString()}</small>
                                </IonText>
                            </IonCol>
                            <IonCol size='6'>
                                <IonImg src={props.thumbnail !== "" ? ""+props.thumbnail : placeholder} className="diary-card-picture" />
                            </IonCol>
                        </>
                    }
                </IonRow>
            </IonGrid>
        </IonCard>
    )
}

export default CardDiaryList