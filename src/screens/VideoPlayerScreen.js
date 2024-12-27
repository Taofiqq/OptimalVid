import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoPlayerScreen = ({route}) => {
  const {video} = route.params;
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${video.title
        .replace(/\s/g, '_')
        .toLowerCase()}.mp4`;

      const downloadResult = await RNFS.downloadFile({
        fromUrl: video.videoUrl,
        toFile: filePath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        Alert.alert('Download Complete', `Video saved to ${filePath}`);

        const newDownload = {
          title: video.title,
          filePath,
        };

        const storedDownloads =
          JSON.parse(await AsyncStorage.getItem('downloadedVideos')) || [];
        storedDownloads.push(newDownload);

        await AsyncStorage.setItem(
          'downloadedVideos',
          JSON.stringify(storedDownloads),
        );
        setDownloadComplete(true);
      } else {
        Alert.alert(
          'Download Failed',
          'An error occurred while downloading the video.',
        );
      }
    } catch (error) {
      console.error('Download Error:', error);
      Alert.alert(
        'Download Error',
        'An error occurred while downloading the video.',
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.video}>
      <VideoPlayer source={{uri: video.videoUrl}} disableBack fullscreen />
      <TouchableOpacity
        style={[
          styles.downloadButton,
          downloadComplete ? styles.buttonDisabled : {},
        ]}
        onPress={handleDownload}
        disabled={downloading || downloadComplete}>
        {downloading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {downloadComplete ? 'Downloaded' : 'Download Video'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
    backgroundColor: 'black',
  },
  downloadButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#808080',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoPlayerScreen;
