import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';

export default function Ubicacion() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de localización en tiempo real denegada');
          return;
        }

        const location = await watchPositionAsync(
          { accuracy: 5, timeInterval: 1000, distanceInterval: 10 },
          (location) => setLocation(location.coords)
        );
        setLocation(location.coords);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      location && location.remove();
    };
  }, []);

  let mapRegion = null;
  let marker = null;
  if (location) {
    mapRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    marker = <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {marker}
      </MapView>
      <Text style={styles.paragraph}>{errorMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
