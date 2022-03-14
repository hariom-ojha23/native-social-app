import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { RootTabScreenProps } from '../../types'
import PostComponent from '../../components/HomeScreen/PostComponent'
import { db } from '../../Firebase/config'
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  limit,
} from 'firebase/firestore'

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

  const addData = async (data: any) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data))
        .then(() => console.log('Data Added'))
        .catch((error) => console.log(error))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (userId !== null) {
      return onSnapshot(doc(db, 'followings', userId), (document) => {
        if (document.data() !== undefined) {
          const data = document.data()?.followingList
          const postsRef = collection(db, 'posts')
          const temp: string[] = data
          if (userId !== null) {
            temp.push(userId)
          }
          const q = query(
            postsRef,
            //orderBy('createdAt', 'desc'),
            where('author.uid', 'in', temp),
            limit(50)
          )

          return onSnapshot(q, (querySnapshot) => {
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
    } else {
      getUserId()
    }
  }, [userId])

  useEffect(() => {
    if (userId !== null) {
      return onSnapshot(doc(db, 'users', userId), (snap) => {
        if (snap.data() !== undefined) {
          const data = snap.data()

          addData(data)
        }
      })
    }
  }, [userId])

  return (
    <SafeAreaView style={styles.container}>
      {userId !== null && (
        <FlatList
          contentContainerStyle={styles.postList}
          data={postList}
          keyExtractor={(_, index) => index.toString()}
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
    //marginBottom: 75,
    marginBottom: 50,
  },
  postList: {
    padding: 15,
  },
})

export default HomeScreen
