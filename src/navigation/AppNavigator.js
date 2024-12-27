import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigation';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Define the BottomTabNavigator as the main screen */}
        <Stack.Screen
          name="Back"
          component={BottomTabNavigator}
          options={{headerShown: false}} // Hide the header for the tab navigator
        />
        {/* Define the VideoPlayerScreen */}
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerScreen}
          options={{headerTitle: 'Video Player'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
