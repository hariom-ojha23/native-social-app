import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Button, Searchbar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { RootStackScreenProps } from '../../types'

import { Text, View } from '../../components/Themed'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'

import { db, auth } from '../../Firebase/config'
import {
  onSnapshot,
  doc,
  collection,
  query,
  where,
  documentId,
  DocumentData,
} from 'firebase/firestore'

import ChatContactItem from '../../components/ChatScreen/ChatContactItem'
import { NavigationProp } from '@react-navigation/native'

type ContactScreenProps = {
  navigation: NavigationProp<{
    ChatRoom: RootStackScreenProps<'ChatContacts'>
  }>
}

const ChatContactsScreen = ({ navigation }: ContactScreenProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [followingList, setFollowingList] = useState<Array<string>>([])
  const [followerList, setFollowerList] = useState<Array<string>>([])

  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]
  const userId = auth.currentUser?.uid

  const onChangeSearch = (query: string) => setSearchQuery(query)

  useEffect(() => {
    getFollowerList()
    getFollowingList()
  }, [])

  const getFollowerList = useCallback(() => {
    if (userId !== undefined) {
      const ref = doc(db, 'followers', userId)
      onSnapshot(ref, (document) => {
        if (document.exists()) {
          const data = document.data()?.followerList
          if (data !== undefined) {
            setFollowerList(data)
          }
        }
      })
    }
  }, [userId])

  const getFollowingList = useCallback(() => {
    if (userId !== undefined) {
      const ref = doc(db, 'followings', userId)
      onSnapshot(ref, (document) => {
        if (document.data() !== undefined) {
          const data = document.data()?.followingList
          if (data !== undefined) {
            setFollowingList(data)
          }
        }
      })
    }
  }, [userId])

  const contactList = useMemo(() => {
    if (followerList.length !== 0 || followingList.length !== 0) {
      const totalList = followerList.concat(followingList)

      const ref = collection(db, 'users')
      const q = query(ref, where(documentId(), 'in', totalList))
      const arr: Array<DocumentData> = []
      onSnapshot(q, (documents) => {
        documents.forEach((document) => {
          arr.push(document.data())
        })
      })

      return arr
    }
  }, [followerList, followingList])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Searchbar
        placeholder="Search Contact"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBox}
      />

      <View style={styles.contactListContainer}>
        <FlatList
          data={contactList}
          renderItem={({ item }: DocumentData) => (
            <ChatContactItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.uid}
          style={styles.contactList}
          ListFooterComponent={() => (
            <View
              style={{
                height: 100,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                <Ionicons name="lock-closed" size={16} color={colors.text} />{' '}
                Messages are end-to-end encrypted
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBox: {
    borderRadius: 25,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  onlineUserBox: {
    height: 100,
    width: '100%',
    marginBottom: 10,
    paddingTop: 10,
  },
  contactListContainer: {
    width: '100%',
  },
  contactList: {
    backgroundColor: 'transparent',
  },
})

export default ChatContactsScreen
