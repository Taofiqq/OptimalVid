import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DownloadsScreen = ({navigation}) => {
  const [downloads, setDownloads] = useState([]);

  const fetchDownloads = async () => {
    try {
      const storedDownloads =
        JSON.parse(await AsyncStorage.getItem('downloadedVideos')) || [];
      setDownloads(storedDownloads);
    } catch (error) {
      console.error('Failed to fetch downloaded videos:', error);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const handlePlayVideo = filePath => {
    navigation.navigate('VideoPlayer', {
      video: {videoUrl: `file://${filePath}`},
    });
  };

  const renderVideoCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePlayVideo(item.filePath)}>
      <Image
        source={{
          uri:
            item.thumbnail ||
            'https://dummyimage.com/150x150/ccc/000&text=No+Thumbnail',
        }}
        style={styles.thumbnail}
      />
      <View style={styles.cardContent}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => handlePlayVideo(item.filePath)}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {downloads.length === 0 ? (
        <Text style={styles.emptyText}>
          You haven't downloaded any videos yet!
        </Text>
      ) : (
        <FlatList
          data={downloads}
          keyExtractor={item => item.filePath}
          renderItem={renderVideoCard}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    paddingVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playButton: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default DownloadsScreen;
