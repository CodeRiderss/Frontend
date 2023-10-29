import React, { useState, useEffect } from 'react';
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
import { Geolocation } from '@capacitor/geolocation';
import { useHistory } from 'react-router';

const Tab1: React.FC = () => {
  const history = useHistory();
  const [postcode, setPostcode] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [seats, setSeats] = useState<string>('');
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);


  async function getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    setLongitude(coordinates.coords.longitude);
    setLatitude(coordinates.coords.latitude);
    console.log("Longitude: " + longitude);
    console.log("Latitude: " + latitude);
  }

  const handleSubmit = () => {
    // Do something with the selected values, e.g., send them to an API
    console.log('Street:', street);
    console.log('Street Number:', streetNumber);
    console.log('City:', city);
    console.log('Postcode:', postcode);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Seats:', seats);

    console.log('Longitude:', longitude);
    console.log('Latitude:', latitude);
    history.push(`/search?long=${longitude}&lat=${latitude}`);


  };
  useEffect(() => {

  

    try {getCurrentPosition();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
            <IonLabel color="primary" style={{fontWeight:'bold' }}>Miete ein Auto</IonLabel>
            
          </IonItem>
          <IonItem style={{ padding: '20px' }}>
            <IonLabel position="floating">Enter street name</IonLabel>
            <IonInput
              type="text"
              value={street}
              onIonChange={(e) => setStreet(e.detail.value!)}
            />
          </IonItem>
          <IonItem style={{ padding: '20px' }}>
            <IonLabel position="floating">Enter street number</IonLabel>
            <IonInput
              type="number"
              value={streetNumber}
              onIonChange={(e) => setStreetNumber(e.detail.value!)}
            />
          </IonItem>
          <IonItem style={{ padding: '20px' }}>
            <IonLabel position="floating">Enter city name</IonLabel>
            <IonInput
              type="text"
              value={city}
              onIonChange={(e) => setCity(e.detail.value!)}
            />
          </IonItem>
          <IonItem style={{ padding: '20px' }}>
            <IonLabel position="floating">Enter Postal Code</IonLabel>
            <IonInput
              type="number"
              value={postcode}
              onIonChange={(e) => setPostcode(e.detail.value!)}
            />
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