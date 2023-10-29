import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useState } from 'react';

const Tab2: React.FC = () => {
  
  const [startTime, setStartTime] = useState<Date>(new Date('2023-01-01'));
  const [endTime, setEndTime] = useState<Date>(new Date('2023-01-01'));

  const [showStartTimeModal, setShowStartTimeModal] = useState<boolean>(false);
  const [showEndTimeModal, setShowEndTimeModal] = useState<boolean>(false);

  const handleStartTime = (value: string) => {
    setStartTime(new Date(value));
  };

  const handleEndTime = (value: string) => {
    setStartTime(new Date(value));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
        </IonToolbar>
      </IonHeader>
      
        <IonItem>

          <IonLabel>Von</IonLabel>
          <IonButton onClick={() => setShowStartTimeModal(true)}>{startTime.toISOString()}</IonButton>

          <IonModal isOpen={showStartTimeModal} onDidDismiss={() => setShowStartTimeModal(false)}>
            <IonDatetime 
              presentation="date-time"
              value={startTime.toISOString()}
              onIonChange={e => handleStartTime(e.detail.value! as string)}
            />
            <IonButton onClick={() => setShowStartTimeModal(false)}>Done</IonButton>
          </IonModal>

        </IonItem>

        

        <IonItem>

          <IonLabel>Bis</IonLabel>
          <IonButton onClick={() => setShowEndTimeModal(true)}>{endTime.toISOString()}</IonButton>

          <IonModal isOpen={showEndTimeModal} onDidDismiss={() => setShowEndTimeModal(false)}>
            <IonDatetime 
              presentation="date-time"
              value={endTime.toISOString()}
              onIonChange={e => handleEndTime(e.detail.value! as string)}
            />
            <IonButton onClick={() => setShowEndTimeModal(false)}>Done</IonButton>
          </IonModal>
          
        </IonItem>

        

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
