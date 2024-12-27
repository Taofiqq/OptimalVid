import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoCard from '../components/VideoCard';
import videoData from '../../assets/data/data.json';
import {useNavigation} from '@react-navigation/native';

const LikedVideosScreen = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const likedVideoIds =
          JSON.parse(await AsyncStorage.getItem('likedVideos')) || [];
        const liked = videoData
          .map(video => ({
            ...video,
            liked: likedVideoIds.includes(video.id),
          }))
          .filter(video => likedVideoIds.includes(video.id));
        setLikedVideos(liked);
      } catch (error) {
        console.error('Failed to load liked videos:', error);
      }
    };

    fetchLikedVideos();
  }, []);

  const handleNavigateToVideoPlayer = video => {
    navigation.navigate('VideoPlayer', {video});
  };

  return (
    <View style={styles.container}>
      {likedVideos.length === 0 ? (
        <Text style={styles.emptyText}>You haven't liked any videos yet!</Text>
      ) : (
        <FlatList
          data={likedVideos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <VideoCard
              title={item.title}
              description={item.description}
              thumbnail={item.thumbnail}
              liked={item.liked}
              onLike={() => null}
              onPress={() => handleNavigateToVideoPlayer(item)}
            />
          )}
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
});

export default LikedVideosScreen;
