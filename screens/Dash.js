import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Profile from "./Profile";
import Location from "./Location";
import Circle from "./Circle";
import Notification from "./Notification";

const Tab = createBottomTabNavigator();

const Dash = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          unmountOnBlur: true
        }}
      >
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Location"
          component={Location}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Circle"
          component={Circle}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Dash;
