import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/react';
import Map from './Map';

const Tab1: React.FC = () => {
  const [postcode, setPostcode] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [seats, setSeats] = useState<string>('');
  const [showMap, setShowMap] = useState(false);

  const openMap = () => {
    if (showMap) {
      setShowMap(false);
    }else {

    setShowMap(true);
    }
  };


  const handleSubmit = () => {
    // Do something with the selected values, e.g., send them to an API
    console.log("Hi")
    console.log('Postcode:', postcode);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Seats:', seats);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
        <div style={{ textAlign: 'center' }}>
          <IonItem style={{ padding: '20px' }}>
            <IonLabel color="primary" position="floating" style={{fontWeight:'bold' }}>Miete ein Auto</IonLabel>
            
          </IonItem>
          <IonItem style={{ padding: '20px' }}>
            <IonLabel position="floating">Enter Postal Code</IonLabel>
            <IonInput
              type="text"
              value={postcode}
              onIonChange={(e) => setPostcode(e.detail.value!)}
            />
            <IonButton onClick={openMap}>Open Map for Location Selection</IonButton>

            {showMap && <Map />}
          </IonItem>
          
          <IonItem style={{ padding: '20px' }}>
            <IonLabel position="floating">Select Start Date</IonLabel>
            <IonInput
              type="datetime-local"
              value={startDate}
              placeholder="Select a start date and time"
              onIonChange={(e) => setStartDate(e.detail.value!)}
            />
          </IonItem>
         
          <IonItem style={{ padding: '20px' }}>
            <IonLabel position="floating">Select End Date</IonLabel>
            <IonInput
              type="datetime-local"
              placeholder="Select an end date and time"
              value={endDate}
              
              onIonChange={(e) => setEndDate(e.detail.value!)}
            />
          </IonItem>
          <IonItem style={{ padding: '20px' }}>
            <IonLabel position="floating">Enter Number of Seats</IonLabel>
            <IonInput
              type="number"
              value={seats}
              onIonChange={(e) => setSeats(e.detail.value!)}
            />
          </IonItem>
          
          <IonButton style={{ padding: '20px' }} expand="full" onClick={handleSubmit}>Submit</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;