import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import videoData from '../../assets/data/data.json';
import VideoCard from '../components/VideoCard';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [videos, setVideos] = useState(videoData);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const likedVideoIds =
          JSON.parse(await AsyncStorage.getItem('likedVideos')) || [];
        const updatedVideos = videoData.map(video => ({
          ...video,
          liked: likedVideoIds.includes(video.id),
        }));
        setVideos(updatedVideos);
      } catch (error) {
        console.error('Failed to load liked videos:', error);
      }
    };

    fetchLikedVideos();
  }, []);

  const handleLike = async id => {
    try {
      const updatedVideos = videos.map(video => {
        if (video.id === id) {
          return {...video, liked: !video.liked};
        }
        return video;
      });

      setVideos(updatedVideos);

      const likedVideoIds = updatedVideos
        .filter(video => video.liked)
        .map(video => video.id);

      await AsyncStorage.setItem('likedVideos', JSON.stringify(likedVideoIds));
    } catch (error) {
      console.error('Failed to save liked videos:', error);
    }
  };

  const handleNavigateToVideoPlayer = video => {
    navigation.navigate('VideoPlayer', {video});
  };

  const logLikedVideos = async () => {
    try {
      const likedVideos = await AsyncStorage.getItem('likedVideos');
      console.log('Liked Videos in AsyncStorage:', JSON.parse(likedVideos));
    } catch (error) {
      console.error('Failed to retrieve liked videos:', error);
    }
  };

  logLikedVideos();

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <VideoCard
            title={item.title}
            description={item.description}
            thumbnail={
              item.thumbnail ||
              'https://dummyimage.com/150x150/cccccc/000000&text=No+Thumbnail'
            }
            liked={item.liked}
            onLike={() => handleLike(item.id)}
            onPress={() => handleNavigateToVideoPlayer(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
