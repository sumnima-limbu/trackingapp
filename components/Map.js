import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const Map = ({ locations }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting ..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: locations[0].latitude,
        longitude: locations[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      mapPadding={{ top: 25, right: 10, bottom: 30, left: 20 }}
    >
      <Polyline
        coordinates={locations}
        strokeColor="#238C23" // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={4}
      />

      {locations.map((location) => (
        <Marker
          key={location.latitude}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          image={require("../assets/dot.png")}
        />
      ))}

      {
        <Marker
          coordinate={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          }}
          title="Last location"
        />
      }
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
