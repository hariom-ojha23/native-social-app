import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'

import { Text, View } from '../../components/Themed'
import { RootTabScreenProps } from '../../types'
import PostComponent from '../../components/HomeScreen/PostComponent'
import { auth, db } from '../../Firebase/config'

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

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  const [postList, setPostList] = useState([])

  return (
    <SafeAreaView style={styles.container}>
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
    marginBottom: 75,
  },
  postList: {
    padding: 15,
  },
})

export default HomeScreen
