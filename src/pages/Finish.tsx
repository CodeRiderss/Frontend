import { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { Link } from 'react-router-dom';

const Finish: React.FC = () => {
 
 
  const [data, setData] = useState([]);

  // Function to calculate distance using Haversine formula
 
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
          <IonCard >
          <IonItem style={{ padding: '20px' }}>
                
            
            <IonLabel>Wow you did it payed x dollars and saved y emissions - congratz buddy.
                
            </IonLabel>
            
            
          </IonItem>
            
            
          </IonCard>
         
        
      </IonContent>
    </IonPage>
  );
};

export default Finish;


