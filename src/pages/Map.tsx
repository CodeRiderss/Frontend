import React, { useRef, useEffect } from 'react';

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const google = window.google; // Access the Google Maps API
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 50.5558, lng: 9.6808 }, // Default location
      zoom: 12,
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '400px' }}
    />
  );
}

export default Map;
