import React, {useMemo, useState} from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import type {Track} from '../../../types/tracksTypes';
import {TopTrackCard} from './cards/TopTrackCard';
import {globalColors} from '../../theme/Theme';

const {width} = Dimensions.get('window');
const ITEMS_PER_PAGE = 3;

interface Props {
  tracks: Track[];
  onTrackPress: (track: Track) => void;
}

export const HorizontalTopTracks: React.FC<Props> = ({
  tracks,
  onTrackPress,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const groupedTracks = useMemo(() => {
    const groups = [];
    for (let i = 0; i < tracks.length; i += ITEMS_PER_PAGE) {
      groups.push(tracks.slice(i, i + ITEMS_PER_PAGE));
    }
    return groups;
  }, [tracks]);

  const renderGroup = ({item: group}: {item: Track[]}) => (
    <View style={styles.pageContainer}>
      {group.map(track => (
        <TopTrackCard
          key={track.id}
          track={track}
          onPress={() => onTrackPress(track)}
        />
      ))}
    </View>
  );

  return (
    <View>
      <FlatList
        data={groupedTracks}
        renderItem={renderGroup}
        keyExtractor={(_, index) => `group-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={width}
        onScroll={event => {
          const newPage = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentPage(newPage);
        }}
        scrollEventThrottle={16}
      />
      <View style={styles.indicatorContainer}>
        {groupedTracks.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentPage && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: width,
    // paddingVertical: 8,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: globalColors.terceary,
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: globalColors.primaryaryAlt2,
    width: 10,
    height: 10,
  },
});
