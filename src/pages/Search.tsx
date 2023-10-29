import { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { Link } from 'react-router-dom';

const Search: React.FC = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let longitude = parseFloat(params.get('long'));
  let latitude = parseFloat(params.get('lat'));
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
    return R * c; // Distance in kilometers
  }

  const profileImageStyle = {
    width: '60px',  // Adjust the size as needed
    height: '60px', // Adjust the size as needed
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto',
  };

  const profileImageImgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  useEffect(() => {
    console.log(longitude);
    console.log(latitude);
    try {
      axios.get("https://erms.stefhol.eu/api/v1/offer").then((response) => {
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
              <IonCardTitle>{item.user.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {/* Render other details from 'item' here 
              <div className="profile-image">
              <img src={item.user.profileUrl} alt="Profile" /> 
              </div> */}
              <p>Description: {item.user.description}</p>
              <p>Telephone: {item.user.telephone}</p>
              <p>Distance: {item.distance.toFixed(2)} kilometers</p> {/* Display the distance */}
              <p>Rating {item.user.averageRating}</p>
              <p>Car {item.car.model}</p>
              
             
              <Link to={`/insure`}> {/* Navigate to /accept/index */}
                <IonButton color="success" style={{padding:"10px", justifyContent: 'center' }}>
                  Accept {/* Add a green accept button */}
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


