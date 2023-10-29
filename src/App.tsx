import { Redirect, Route } from 'react-router-dom';
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
import { searchOutline, personOutline, pricetagsOutline, chatboxEllipsesOutline, bookOutline} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';

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
import { AuthProvider } from './components/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import MainTabs from './pages/MainTabs';
import PrivateRoute from './components/PrivateRoute';
import Insure from './pages/Insure';
import Finish from './pages/Finish';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AuthProvider>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <PrivateRoute path="/tabs" component={MainTabs} />
        <Route path="/search" component={Search} exact />
        <Route path="/insure" component={Insure} exact />
        <Route path="/finish" component={Finish} exact />
      </AuthProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
