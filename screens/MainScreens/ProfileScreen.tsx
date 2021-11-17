import React from 'react'
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  View,
  FlatList,
} from 'react-native'
import { Text } from '../../components/Themed'
import {
  Avatar,
  Button,
  Headline,
  Subheading,
  Title,
  Caption,
} from 'react-native-paper'
import ProfileInfoComponent from '../../components/ProfileScreen/ProfileInfoComponent'
import PostListComponent from '../../components/ProfileScreen/PostListComponent'

const posts = [
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
    id: '58694a0g-3da1-471f-bd96-145571e29d70',
    url: 'https://picsum.photos/900',
  },
  {
    id: '58694a0e-3da1-471f-bd96-145571e29d76',
    url: 'https://picsum.photos/100',
  },
  {
    id: '3ac68afn-c605-48d3-a4f8-fbd91aa97f63',
    url: 'https://picsum.photos/250',
  },
  {
    id: '58694a0q-3da1-471f-bd96-145571e29d74',
    url: 'https://picsum.photos/300',
  },
  {
    id: '58694a0e-3da1-471f-bd96-145571e29d73',
    url: 'https://picsum.photos/100',
  },
  {
    id: '3ac68afn-c605-48d3-a4f8-fbd91aa97f62',
    url: 'https://picsum.photos/250',
  },
  {
    id: '58694a0q-3da1-471f-bd96-145571e29d71',
    url: 'https://picsum.photos/300',
  },
]

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <FlatList
        // style={styles.postList}
        ListHeaderComponent={<ProfileInfoComponent />}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={PostListComponent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={2}
        horizontal={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  postList: {
    paddingBottom: 100,
  },
  columnWrapperStyle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
})

export default ProfileScreen
