import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { RootTabScreenProps } from '../../types'
import PostComponent from '../../components/HomeScreen/PostComponent'
import { db } from '../../Firebase/config'
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore'

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  const [postList, setPostList] = useState([])
  const [userId, setUserId] = useState<string | null>(null)

  const getUserId = async () => {
    AsyncStorage.getItem('uid')
      .then((res) => {
        setUserId(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (userId !== null) {
      const getPosts = async () => {
        onSnapshot(doc(db, 'followings', userId), (document) => {
          if (document.data() !== undefined) {
            const data = document.data()?.followingList
            const postsRef = collection(db, 'posts')
            const temp: string[] = data
            if (userId !== null) {
              temp.push(userId)
            }
            const q = query(postsRef, where('author.uid', 'in', temp))

            onSnapshot(q, (querySnapshot) => {
              const array: any = []
              querySnapshot.forEach((docs) => {
                const obj = docs.data()
                obj['id'] = docs.id
                array.push(obj)
              })
              setPostList(array)
            })
          }
        })
      }

      getPosts()
    } else {
      getUserId()
    }
  }, [userId])

  return (
    <SafeAreaView style={styles.container}>
      {userId !== null && (
        <FlatList
          contentContainerStyle={styles.postList}
          data={postList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <PostComponent item={item} userId={userId} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
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
