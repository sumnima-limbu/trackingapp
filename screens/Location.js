import { useEffect, useContext } from "react";
import { View } from "react-native";
import getDistance from 'geolib/es/getDistance';
import * as ExpoLocation from 'expo-location';
import GlobalContext from './../Store/GlobalContext';
import Map from "./../components/Map";
import {
  InnerContainer,
  WelcomeContainer,
} from "./../components/style";

let foregroundSubscription = null;
let prevPosition = {
  latitude: 27.7080,
  longitude: 85.3157,
};

const Location = () => {
  const store = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      // Check if foreground permission is granted
      const { granted } = await ExpoLocation.getForegroundPermissionsAsync()
      if (!granted) {
        console.log("location tracking denied")
        return
      }

      // Make sure that foreground location tracking is not running
      foregroundSubscription?.remove()

      // Start watching position in real-time
      foregroundSubscription = await ExpoLocation.watchPositionAsync(
        {
          // For better logs, we set the accuracy to the most sensitive option
          accuracy: ExpoLocation.Accuracy.BestForNavigation,
        },
        location => {
          if (getDistance(prevPosition, location.coords) > 50) {
            prevPosition = location.coords;
            store.createLocation(prevPosition);
          }
          // setPosition(location.coords);
        }
      )
    })();
  }, []);

  useEffect(() => {
    if (store.locations && store.locations.length > 0) return;

    store.getLocations()
      .then(res => {
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <>
      <InnerContainer>
        <WelcomeContainer>
          {
            store.locations && store.locations.length > 0 && <Map locations={store.locations} />
          }
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};


export default Location;
