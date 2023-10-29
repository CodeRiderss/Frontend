import { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { Link } from 'react-router-dom';

const Insure: React.FC = () => {
 
 
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
            <IonLabel>https://appsichern.de/carsharingschutz.html
                
            </IonLabel>
            <IonLabel>4,99€ inkl. Steuern
                
            </IonLabel>
            <Link to={`/finish`}> {/* Navigate to /accept/index */}
                <IonButton color="success" >
                  Accept {/* Add a green accept button */}
                </IonButton>
              </Link>
            
          </IonItem>
            
            
          </IonCard>
          <IonCard >
          <IonItem style={{ padding: '20px' }}>
            <IonLabel>https://versicherung-kurzzeitkennzeichen.com/</IonLabel>
            
          
          <IonLabel>5,99€ inkl. Steuern
                
            </IonLabel>
            <Link to={`/finish`}> {/* Navigate to /accept/index */}
                <IonButton color="success" >
                  Accept {/* Add a green accept button */}
                </IonButton>
              </Link>
              </IonItem>
            
          </IonCard>
          <IonCard >
          <IonItem style={{ padding: '20px' }}>
          <IonLabel>https://mietwagenschutz.vwfs.de/</IonLabel>
          
          <IonLabel>3,99€ inkl. Steuern
                
            </IonLabel>
            <Link to={`/finish`}> {/* Navigate to /accept/index */}
                <IonButton color="success" >
                  Accept {/* Add a green accept button */}
                </IonButton>
              </Link>
              </IonItem>
            
            
          </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default Insure;


