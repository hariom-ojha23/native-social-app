import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  ScrollView,
} from 'react-native'
import { View } from '../../components/Themed'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'
import { Appbar, Avatar, IconButton } from 'react-native-paper'
import { RootStackScreenProps, RootTabScreenProps } from '../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { Ionicons, Entypo } from '@expo/vector-icons'
import ChatMessage from '../../components/ChatScreen/ChatMessage'
import { RouteProp } from '@react-navigation/native'
import { db, auth } from '../../Firebase/config'
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  onSnapshot,
  DocumentData,
  query,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore'

import EmojiPicker from '../../components/ChatScreen/Emoji/EmojiPicker'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import ChatInput from '../../components/ChatScreen/ChatInput'

type Props = {
  navigation: RootStackScreenProps<'ChatRoom'>
  route: RouteProp<{
    params: {
      displayName: string
      profilePhotoUrl: string
      roomId: string
      exist: boolean
      members: Array<string>
    }
  }>
}

const ChatRoomScreen = ({ navigation, route }: Props) => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState<Array<DocumentData>>([])
  const [isExist, setIsExist] = useState<boolean>(false)
  const [roomID, setRoom] = useState<string>('')

  const { currentUser } = auth
  const userId = currentUser?.uid

  const { displayName, profilePhotoUrl, roomId, exist, members } = route.params
  const otherUserId = members.filter((x) => x !== userId)[0]

  // If chatroom doesn't exist create new chatroom
  useEffect(() => {
    if (!exist) {
      const createChatRoom = async () => {
        const ref = collection(db, 'chatroom')
        const memberHex = members.sort().join('&&')
        await addDoc(ref, {
          createdAt: new Date(),
          modifiedAt: new Date(),
          createdBy: userId,
          memberHex: memberHex,
          members: members,
        }).then((res) => {
          setRoom(res.id)
          updateDoc(doc(db, 'chatroom', res.id), {
            id: res.id,
          })
            .then(() => setIsExist(true))
            .catch((error) => console.log(error))
        })
      }

      createChatRoom()
    } else {
      setRoom(roomId)
      setIsExist(true)
    }
  }, [exist])

  // if it exists fetch messages from chatroom
  useEffect(() => {
    if (isExist) {
      const msgRef = collection(db, 'message', roomID, 'messages')
      const q = query(msgRef, orderBy('sentAt', 'desc'), limit(100))
      const unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const messageArr: Array<DocumentData> = []
          snapshot.forEach((document) => {
            const data = document.data()
            data.id = document.id
            messageArr.push(data)
          })

          setMessages(messageArr)
        } else {
          console.log('No Messages')
        }
      })

      return () => unsub()
    }
  }, [isExist])

  // send messages to other user
  const sendMessage = async () => {
    if (value.length === 0) {
      return
    }
    const temp = value
    setValue('')
    const msgRef = collection(db, 'message', roomID, 'messages')
    const time = Timestamp.now()
    const data = {
      messageText: temp,
      messageType: 'text',
      messageMedia: [],
      sentAt: time,
      sentBy: userId,
    }
    addDoc(msgRef, data)
      .then(() => {
        console.log('message sent')
      })
      .then(() => {
        updateDoc(doc(db, 'chatroom', roomID), {
          recentMessage: data,
          modifiedAt: time,
        }).catch((error) => console.log(error))
      })

      .catch((error) => console.log(error))
  }

  // go to other user profile
  const goToUserProfile = () => {
    navigation.navigate('OthersProfile', { id: otherUserId } as any)
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Avatar.Image
          size={30}
          source={{
            uri: `${profilePhotoUrl}`,
          }}
        />
        <Appbar.Content
          title={displayName}
          subtitle="Online"
          onPress={() => goToUserProfile()}
        />
      </Appbar.Header>

      {/* <ScrollView></ScrollView> */}

      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}
      >
        <FlatList
          inverted
          data={messages}
          renderItem={({ item }) => <ChatMessage item={item} />}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
        />
      </SafeAreaView>

      <ChatInput value={value} setValue={setValue} sendMessage={sendMessage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  chatList: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 15,
  },
})

export default ChatRoomScreen
