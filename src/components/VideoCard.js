import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VideoCard = ({title, description, thumbnail, liked, onLike, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Thumbnail */}
      <Image source={{uri: thumbnail}} style={styles.thumbnail} />

      {/* Video Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>

      {/* Like Button */}
      <TouchableOpacity onPress={onLike}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={24}
          color={liked ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 1, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: 'gray',
  },
});

export default VideoCard;
