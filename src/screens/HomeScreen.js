import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import videoData from '../../assets/data/data.json';
import VideoCard from '../components/VideoCard';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [videos, setVideos] = useState(videoData);
  const navigation = useNavigation();
  const handleLike = id => {
    const updatedVideos = videos.map(video => {
      if (video.id === id) {
        return {...video, liked: !video.liked};
      }
      return video;
    });
    setVideos(updatedVideos);
  };

  const handleNavigateToVideoPlayer = video => {
    navigation.navigate('VideoPlayer', {video});
  };

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
