import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, library, map, people, personCircle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import getItemLocalStorage from './logic/getItemLocalStorage';
import Introduction from './pages/Introduction';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import IsAuthorized from './components/IsAuthorized';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Diaries from './pages/Diaries';

setupIonicReact();

const App: React.FC = () => {
  const [configurato,setConfigurato]=useState(false)
  const [autorizzato,setAutorizzato]=useState(Boolean)

  useEffect(()=>{
    setConfigurato(getItemLocalStorage("configurato"))
    console.log(document.cookie)

    fetch("/auth/authorized",{
      method: "GET"
    })
    .then(result=>result.json())
    .then(result=>{
        if (result.stato==true) {
            console.log("ok")
            setAutorizzato(true)
        }
        else {
            setAutorizzato(false)
        }
    })
    .catch(err=>{
        setAutorizzato(false)
    })
  },[])

  return(  
    <IonApp>
      <IonReactRouter>
        {
          configurato === null &&
          <Switch>
            <Route exact path="/">
              <Redirect to="/introduction" />
            </Route>
            <Route exact path="/introduction">
              <Introduction />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/signin">
              <SignIn setConfigurato={setConfigurato} setAutorizzato={setAutorizzato} />
            </Route>
          </Switch>
        }
        {
          configurato === true && autorizzato &&
              <IonTabs>
                <IonRouterOutlet>
                  <Switch>
                      <Route exact path="/home">
                        <Home />
                      </Route>
                      <Route exact path="/diaries">
                        <Diaries />
                      </Route>
                      <Route exact path="/profile">
                        <Profile />  
                      </Route>
                      <Route exact path="/">
                        <Redirect to="/home" />
                      </Route>
                  </Switch>
                </IonRouterOutlet>
                <IonTabBar slot="bottom" className="spazio-fondo">
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="diaries" href="/diaries">
                    <IonIcon icon={library} />
                    <IonLabel>Diaries</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="people" href="/people">
                    <IonIcon icon={people} />
                    <IonLabel>People</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="places" href="/places">
                    <IonIcon icon={map} />
                    <IonLabel>Places</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Profile</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
        }
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
