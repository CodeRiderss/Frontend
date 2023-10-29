import { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,IonIcon, IonCardSubtitle, IonButton, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { Link } from 'react-router-dom';
import { star } from 'ionicons/icons';


const Search: React.FC = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let longitude = parseFloat(params.get('long'));
  let latitude = parseFloat(params.get('lat'));
  let von = params.get('von');
  let bis = params.get('bis');
  const [data, setData] = useState([]);

  // Function to calculate distance using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.floor(R * c); // Distance in kilometers
  }

  useEffect(() => {
    console.log(longitude);
    console.log(latitude);
    try {
      axios.get(`https://erms.stefhol.eu/api/v1/offer?startDate=${new Date(von).toISOString()}&endDate=${new Date(bis).toISOString()}`).then((response) => {
        // Calculate distances and sort the data
        const sortedData = response.data.map(item => {
          const distance = calculateDistance(latitude, longitude, item.latitude, item.longitude);

          return { ...item, distance };
        });

        sortedData.sort((a, b) => a.distance - b.distance);

        setData(sortedData);
      });
    } catch (error) {
      console.log(error);
    }
  }, [longitude, latitude]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
        </IonToolbar>
        </IonHeader>
      <IonContent>
        {data.map((item, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>{item.car.model}</IonCardTitle>
                <IonCardSubtitle>Entfernung: {item.distance} km</IonCardSubtitle>
              <IonCardSubtitle>
                von {item.user.name} {!isNaN(item.user.averageRating) ? item.user.averageRating : "-"}/5.0
                <IonIcon icon={star} style={{ paddingLeft:"0.3rem", color: "orange" }}></IonIcon>
                </IonCardSubtitle>
                <IonCardSubtitle>von {new Date(von).toDateString()} bis {new Date(bis).toDateString()}</IonCardSubtitle>
              <IonCardSubtitle>{item.priceInEuro}€ Mietkosten</IonCardSubtitle>
            </IonCardHeader>
            <img alt="image link" src={item.car.imageUrl} />
            <IonCardContent>
              <Link to={`/tabs/insure?prize=${item.priceInEuro}&von=${von}&bis=${bis}&user=${item.user.id}&offer=${item.id}`}> 
                <IonButton color="primary" style={{ paddingLeft:"0.3rem", justifyContent: 'center' }}>
                  Buchen
                </IonButton>
              </Link>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Search;


