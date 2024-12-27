import React from 'react';
import {StyleSheet, View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const VideoPlayerScreen = ({route}) => {
  const {video} = route.params;

  return (
    <View style={styles.video}>
      <VideoPlayer
        source={{uri: video.videoUrl}}
        disableBack
        fullscreen={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default VideoPlayerScreen;
