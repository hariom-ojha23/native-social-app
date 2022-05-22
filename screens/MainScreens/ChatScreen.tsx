import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { RootTabScreenProps } from '../../types'
import { Text, View } from '../../components/Themed'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'
import ChatListItem from '../../components/ChatScreen/ChatListItem'
import { db, auth } from '../../Firebase/config'
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'

type Props = RootTabScreenProps<'Chat'>

const ChatScreen = ({ navigation, route }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [chatRooms, setChatRooms] = useState<Array<DocumentData>>([])

  const { currentUser } = auth
  const userId = currentUser?.uid
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  const onChangeSearch = (query: string) => setSearchQuery(query)

  useEffect(() => {
    const getChatRooms = async () => {
      const ref = collection(db, 'chatroom')
      const q = query(ref, where('members', 'array-contains', userId))

      const unsub = onSnapshot(q, (snapshots) => {
        if (!snapshots.empty) {
          const allChatRoom: Array<DocumentData> = []
          snapshots.forEach((snap) => {
            const data = snap.data()
            data.id = snap.id

            if (data.recentMessage) {
              allChatRoom.push(data)
            }
          })

          setChatRooms(allChatRoom)
        }
      })

      return () => unsub()
    }

    getChatRooms()
  }, [])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Searchbar
        placeholder="Search Chat"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBox}
      />
      <View style={styles.chatListContainer}>
        <FlatList
          data={chatRooms}
          renderItem={({ item }) => (
            <ChatListItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
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
    marginBottom: 50,
    paddingBottom: 50,
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
  chatListContainer: {
    width: '100%',
  },
  chatList: {
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
})

export default ChatScreen
