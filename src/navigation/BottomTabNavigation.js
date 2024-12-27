import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LikedVideosScreen from '../screens/LikedVideosScreen';
import DownloadsScreen from '../screens/DownloadsScreen';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (route, focused, color, size) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Search') {
    iconName = focused ? 'search' : 'search-outline';
  } else if (route.name === 'Liked') {
    iconName = focused ? 'heart' : 'heart-outline';
  } else if (route.name === 'Downloads') {
    iconName = focused ? 'download' : 'download-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          renderTabBarIcon(route, focused, color, size),
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'OptimalVid',
        }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Liked"
        options={{
          headerTitle: 'Liked Videos',
        }}
        component={LikedVideosScreen}
      />
      <Tab.Screen name="Downloads" component={DownloadsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
