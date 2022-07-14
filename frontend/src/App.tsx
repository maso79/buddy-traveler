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
import { ellipse, square, triangle } from 'ionicons/icons';

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

setupIonicReact();

const App: React.FC = () => {
  const [configurato,setConfigurato]=useState(false)

  useEffect(()=>{
    setConfigurato(getItemLocalStorage("configurato"))
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
          </Switch>
        }
        {
          configurato === true &&
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">

              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={triangle} />
                <IonLabel>Tab 1</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={square} />
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        }
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
