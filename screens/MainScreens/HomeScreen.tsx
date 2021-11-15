import * as React from 'react'
import { StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native'

import { Text, View } from '../../components/Themed'
import { RootTabScreenProps } from '../../types'
import PostComponent from '../../components/HomeScreen/PostComponent'
import StoryComponent from '../../components/HomeScreen/StoryComponent'

const posts = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Aditya Shrivastav',
    userName: '@chocolateBoy',
    url: 'https://picsum.photos/700',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fullName: 'Hari om Ojha',
    userName: '@harry',
    url: 'https://picsum.photos/750',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Akash Sharma',
    userName: '@panditJi',
    url: 'https://picsum.photos/800',
  },
]

const stories = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    url: 'https://picsum.photos/500',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    url: 'https://picsum.photos/550',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    url: 'https://picsum.photos/600',
  },
  {
    id: '3ac68afv-c605-48d3-a4f8-fbd91aa97f63',
    url: 'https://picsum.photos/950',
  },
  {
    id: '58694a0g-3da1-471f-bd96-145571e29d72',
    url: 'https://picsum.photos/900',
  },
  {
    id: '58694a0e-3da1-471f-bd96-145571e29d72',
    url: 'https://picsum.photos/100',
  },
  {
    id: '3ac68afn-c605-48d3-a4f8-fbd91aa97f63',
    url: 'https://picsum.photos/250',
  },
  {
    id: '58694a0q-3da1-471f-bd96-145571e29d72',
    url: 'https://picsum.photos/300',
  },
]

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.storyContainer}>
        <FlatList
          contentContainerStyle={styles.storyList}
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={StoryComponent}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.postList}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={PostComponent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storyContainer: {
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  storyList: {
    borderRadius: 15,
    resizeMode: 'contain',
  },
  postList: {
    padding: 15,
    paddingBottom: 100,
  },
})

export default HomeScreen
