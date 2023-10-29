import { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { Link } from 'react-router-dom';
import { checkmarkCircle } from 'ionicons/icons';

const Finish: React.FC = () => {

    
        const containerStyle = {
          display: 'flex',
          
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f0f0f0', // Background color
        };
      
        const successIconStyle = {
          fontSize: '5rem',
          color: 'green', // Icon color
        };
      
        const successMessageStyle = {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginTop: '1rem',
          color: 'primary', // Text color
        };
    
    const [prize, setPrize] = useState<string | null>();
 
    useEffect(() => {

        const params = new URLSearchParams(location.search);
        setPrize(params.get('prize')) ;
        const user = params.get('user');

        axios.post('https://erms.stefhol.eu/api/v1/user/'+user+'/order', {
            startDate: new Date(params.get('von')).toISOString(),
            endDate: new Date(params.get('bis')).toISOString(),
            offerId: params.get('offer'),

        }).then((response) => {
            console.log(response);
        }
        ).catch((error) => {
            console.log(error);
        }
        );

    }, []);

  // Function to calculate distance using Haversine formula
 
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={containerStyle}>
          <IonIcon icon={checkmarkCircle} style={successIconStyle} />
          <IonText style={successMessageStyle}>Order Successful!</IonText>
          
        </div>
      </IonContent>
    </IonPage>
  );
};
    

export default Finish;


