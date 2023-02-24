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
import { book, bookOutline, home, homeOutline, library, libraryOutline, map, mapOutline, people, peopleOutline, personCircle, personCircleOutline } from 'ionicons/icons';

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
import Profile from './pages/Profile';
import Home from './pages/Home';
import Diaries from './pages/Diaries';
import People from './pages/People';
import Followers from './pages/Followers';
import Following from './pages/Following';
import PeopleUserView from './pages/PeopleUserView';
import serverFetchNative from './logic/serverFetchNative';
import navbarIcons from './logic/navbarIcons';
import Diary from './pages/Diary';

setupIonicReact();

const App: React.FC = () => {
  const [configurato,setConfigurato]=useState(false)
  const [autorizzato,setAutorizzato]=useState(Boolean)

  const isAuth=async()=>{
      const richiesta=await serverFetchNative("/auth/authorized","GET",JSON.stringify({}))
      if (richiesta.stato == true) setAutorizzato(true)
      else setAutorizzato(false)
  }

  useEffect(()=>{
    setConfigurato(getItemLocalStorage("configurato"))
    console.log(getItemLocalStorage("configurato"))

    try{
      isAuth()
    }
    catch(e){
      console.log("non auth")
      setAutorizzato(false)
    }
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
          configurato === true && autorizzato===false &&
          <Switch>
            <Route exact path="/">
              <Redirect to="/signin" />
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
          configurato === true && autorizzato===true &&
              <IonTabs>
                <IonRouterOutlet>
                  <Switch>
                      <Route exact path="/home">
                        <Home />
                      </Route>
                      <Route exact path="/diaries">
                        <Diaries />
                      </Route>
                      <Route exact path="/diary/:diary_id">
                        <Diary />
                      </Route>
                      <Route exact path="/people">
                        <People />
                      </Route>
                      <Route exact path="/people/:username&:id_utente">
                        <PeopleUserView />
                      </Route>
                      <Route exact path="/followers">
                        <Followers />
                      </Route>
                      <Route exact path="/following">
                        <Following />
                      </Route>
                      <Route exact path="/profile">
                        <Profile setAutorizzato={setAutorizzato} setConfigurato={setConfigurato} />  
                      </Route>
                      <Route exact path="/">
                        <Redirect to="/home" />
                      </Route>
                  </Switch>
                </IonRouterOutlet>
                <IonTabBar slot="bottom" className="spazio-fondo tabbar" color={"primary"}>
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={navbarIcons.fill!="home" ? homeOutline : home} className="tabbar-icon" />
                  </IonTabButton>
                  <IonTabButton tab="diaries" href="/diaries">
                    <IonIcon icon={navbarIcons.fill!="diaries" ? bookOutline : book} className="tabbar-icon" />
                  </IonTabButton>
                  <IonTabButton tab="people" href="/people">
                    <IonIcon icon={peopleOutline} className="tabbar-icon" />
                  </IonTabButton>
                  <IonTabButton tab="places" href="/places">
                    <IonIcon icon={mapOutline} className="tabbar-icon" />
                  </IonTabButton>
                  <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={personCircleOutline} className="tabbar-icon" />
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
        }
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
