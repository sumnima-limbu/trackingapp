import React, { useContext } from "react";
import GlobalContext from "../Store/GlobalContext";
import Dash from "./Dash";
import Login from "./Login";
import Signup from "./Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Main = () => {
  const store = useContext(GlobalContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {
          !store.user ? (
            <>
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="signup" component={Signup} />
            </>
          ) : (
            <>
              <Stack.Screen name="dash" component={Dash} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

