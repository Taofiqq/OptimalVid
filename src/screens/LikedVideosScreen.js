import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LikedVideosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here Are Your Liked Videos!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LikedVideosScreen;
