import React, {useEffect, useState} from 'react';
import {View, TextInput, FlatList, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoCard from '../components/VideoCard';
import videoData from '../../assets/data/data.json';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(videoData);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const likedVideoIds = await AsyncStorage.getItem('likedVideos');
        const likedIds = likedVideoIds ? JSON.parse(likedVideoIds) : [];

        const updatedVideos = videoData.map(video => ({
          ...video,
          liked: likedIds.includes(video.id),
        }));

        setFilteredVideos(updatedVideos);
      } catch (error) {
        console.error('Error fetching liked videos:', error);
      }
    };

    fetchLikedVideos();
  }, []);

  const handleSearch = text => {
    setSearchText(text);

    const filtered = videoData.filter(
      video =>
        video.title.toLowerCase().includes(text.toLowerCase()) ||
        video.description.toLowerCase().includes(text.toLowerCase()),
    );

    const updatedFiltered = filtered.map(video => {
      const matchingVideo = filteredVideos.find(item => item.id === video.id);
      return matchingVideo || video;
    });

    setFilteredVideos(updatedFiltered);
  };

  const handleLike = async videoId => {
    try {
      const updatedVideos = filteredVideos.map(video => {
        if (video.id === videoId) {
          return {...video, liked: !video.liked};
        }
        return video;
      });

      setFilteredVideos(updatedVideos);

      const likedVideoIds = updatedVideos
        .filter(video => video.liked)
        .map(video => video.id);
      await AsyncStorage.setItem('likedVideos', JSON.stringify(likedVideoIds));
    } catch (error) {
      console.error('Failed to update like status:', error);
    }
  };

  const handleNavigateToVideoPlayer = video => {
    navigation.navigate('VideoPlayer', {video});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search videos..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {filteredVideos.length === 0 ? (
        <Text style={styles.emptyText}>No videos found!</Text>
      ) : (
        <FlatList
          data={filteredVideos}
          keyExtractor={item => item.id.toString()}
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
