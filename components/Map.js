import { StyleSheet, Dimensions } from "react-native";
import MapView, { Polyline, Marker } from 'react-native-maps';

const Map = ({ locations }) => {
  return (
    <MapView style={styles.map}
      region={{
        latitude: locations[0].latitude,
        longitude: locations[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation={true}
    >
      <Polyline
        coordinates={locations}
        strokeColor="#238C23" // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={4}
      />

      {
        locations.map(location => (<Marker key={location.latitude}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          image={require('../assets/dot.png')}
        />
        ))
      }

      {
        <Marker
          coordinate={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude
          }}
          title="Last location"
        />
      }
    </MapView>
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
});


export default Map;
