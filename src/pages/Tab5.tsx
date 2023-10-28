import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab5.css';
import { useHistory } from 'react-router';
import { useAuth } from '../components/AuthContext';

const Tab5: React.FC = () => {

  const history = useHistory();
  const { logout  } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 5</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 5</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 5 page" />
        <IonButton expand="full" onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab5;
