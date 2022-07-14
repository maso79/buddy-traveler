import { IonContent, IonPage, IonSlides } from '@ionic/react';
import * as React from 'react';
import Slide from '../components/Slide';
import placeholder from '../pictures/placeholder.png'
import '../theme/buddy-traveler.css'

const slides=[
    {
        title: "Welcome to Buddy Traveler!",
        text: "Buddy Traveler is your personal travel assistant, and it offers you some useful services. Swipe to discover them all!",
        picture: placeholder
    },
    {
        title: "Travel Journal",
        text: "Want to keep track of your travels? With Buddy Traveler, it's easy as pie: you can add as many entries as you want! Or, if you allow Buddy Traveler to do so, it will automatically keep track of where you go",
        picture: placeholder
    },
    {
        title: "Get to know new people",
        text: "Why would you travel alone when Buddy Traveler can find other buddies for you? Just tell Buddy Traveler what kind of people you're looking for",
        picture: placeholder
    },
    {
        title: "Community landmarks",
        text: "Buddy Traveler finds interesting places to go by allowing users to highlight the places they've liked the most",
        picture: placeholder
    },
    {
        title: "Let's get started",
        text: "Just fill in a couple forms and you'll be ready to start!",
        picture: placeholder
    },
]

const Introduction: React.FC=()=>{
    const options={
        initialSlide: 0,
        speed: 400
    }

    return(
        <IonPage>
            <IonContent>
                <IonSlides pager={true} options={options} className="fullscreen">
                    {
                        slides.map((slide,i)=>(
                            <Slide key={i} title={slide.title} text={slide.text} picture={slide.picture} last={i === slides.length-1} />
                        ))
                    }
                </IonSlides>
            </IonContent>
        </IonPage>   
    )
}

export default Introduction