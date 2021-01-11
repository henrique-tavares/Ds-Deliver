import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from './Home';
import Orders from './Orders';
import OrderDetails from './OrderDetails';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        screenOptions={ {
          cardStyle: {
            backgroundColor: '#FFF'
          }
        } }
      >
        <Screen name="Home" component={ Home }></Screen>
        <Screen name="Orders" component={ Orders }></Screen>
        <Screen name="OrderDetails" component={ OrderDetails }></Screen>
      </Navigator>
    </NavigationContainer>
  );
}