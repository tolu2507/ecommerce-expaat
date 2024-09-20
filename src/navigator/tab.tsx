/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import HomeScreen from '../screen/HomeScreen';
import ProductScreen from '../screen/ProductScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tabs = createMaterialBottomTabNavigator();

export default function Tab() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen name="Products" component={ProductScreen} />
    </Tabs.Navigator>
  );
}
