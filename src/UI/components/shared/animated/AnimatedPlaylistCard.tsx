import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {PlaylistCard} from '../cards/PlaylistCard';

export const AnimatedPlaylistCard = ({
  index,
  title,
  color,
  onPress,
  onEdit,
  onShare,
  onDelete,
}) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * 100;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{translateY}],
        },
      ]}>
      <PlaylistCard
        title={title}
        color={color}
        onPress={onPress}
        onEdit={onEdit}
        onShare={onShare}
        onDelete={onDelete}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
