import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { globalColors } from '../../theme/Theme';
import { useAccordion } from '../../../hooks';




export const AccordionItem = ({ askes, setAskes }) => {
  const { OpenAccordion } = useAccordion()



  return (
    <View style={{ flex: 1, }}>
      <FlatList
        horizontal={false}
        data={askes}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.ContainerList}>
            <Pressable onPress={() => OpenAccordion(item.id, setAskes, askes)} style={styles.containerAsk}>
              <Text style={styles.ask}>
                {item.ask}
              </Text>
              <Icon name={item.state ? 'chevron-forward' : 'chevron-down'} size={24} color={globalColors.light} />
            </Pressable>

            <View style={[styles.answerContainer, !item.state ? styles.show : { height: '200px', }]} collapsable={false}>
              <Text style={{ color: "black", }}>
                {item.answer}
              </Text>
            </View>

          </View>
        )

        } />


    </View >
  )
}

const styles = StyleSheet.create({

  ContainerList: {
    marginTop: 20,


  },
  ask: {
    width: 200,
    color: globalColors.light,
    fontSize: 14,
  },
  answerContainer: {
    padding: 10,


  },
  show: {
    height: '0%',

  },
  containerAsk: {
    backgroundColor: globalColors.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    minHeight: 100
  }
});
