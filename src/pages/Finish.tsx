import { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonIcon, IonText, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';

const Finish: React.FC = () => {
  
        const containerStyle = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '-webkit-fill-available;',
          padding: '1.5rem',
          backgroundColor: '#f0f0f0', // Background color
        } as CSSProperties;
      
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
            startDate: new Date(params.get('von')!).toISOString(),
            endDate: new Date(params.get('bis')!).toISOString(),
            offerId: params.get('offer'),

        }).then((response) => {
            console.log(response);
        }
        ).catch((error) => {
            console.log(error);
        }
        );

    }, []);
function calc(){
    const params = new URLSearchParams(location.search);
    const startDate = new Date(params.get('von')!)
            const endDate = new Date(params.get('bis')!)
    return  (endDate.valueOf() - startDate.valueOf() ) / (1000 * 60 * 60 * 24) * 3.5
}
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
          <span style={{    display: 'flex',
    alignItems: 'center'}}>
          <IonIcon icon={checkmarkCircle} style={successIconStyle} />
          <IonText style={successMessageStyle}>Order Successful!</IonText>
          </span>
          <IonText> Du hast heute <b> {calc().toFixed(2)}kg Co2</b> gespart.</IonText>
        </div>
        
            
        
      </IonContent>
    </IonPage>
  );
};
    

export default Finish;


