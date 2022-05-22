import React from 'react'
import { TouchableHighlight } from 'react-native'

import { Avatar, List } from 'react-native-paper'
import styles from '../ChatContactItem/style'
import { ContactItem, RootStackScreenProps } from '../../../types'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { db, auth } from '../../../Firebase/config'
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

interface Props {
  item: ContactItem
  navigation: NavigationProp<{
    ChatRoom: RootStackScreenProps<'ChatRoom'>
  }>
}

const ChatContactItem = (props: Props) => {
  const { item, navigation } = props
  const { currentUser } = auth
  const userId = currentUser?.uid
  const members = [item.uid, userId]
  const memberHex = members.sort().join('&&')

  const goToChatRoom = async () => {
    const roomRef = collection(db, 'chatroom')
    const q = query(roomRef, where('memberHex', '==', memberHex))
    const docSnap = await getDocs(q)

    if (docSnap.empty) {
      navigation.navigate('ChatRoom', {
        displayName: item.displayName,
        profilePhotoUrl: item.profilePhotoUrl,
        roomId: '',
        exist: false,
        members: members,
      } as any)
    } else {
      const roomArr: Array<DocumentData> = []
      docSnap.forEach((snap) => {
        roomArr.push({ ...snap.data(), id: snap.id })
      })

      const room = roomArr[0]
      navigation.navigate('ChatRoom', {
        displayName: item.displayName,
        profilePhotoUrl: item.profilePhotoUrl,
        roomId: room.id,
        exist: true,
        members: members,
      } as any)
    }
  }

  return (
    <TouchableHighlight
      onPress={() => goToChatRoom()}
      style={{ paddingHorizontal: 15 }}
      activeOpacity={1}
      underlayColor="#f5f5f5"
    >
      <List.Item
        title={item.displayName}
        description={`@${item.userName}`}
        left={(props) => (
          <Avatar.Image
            size={50}
            {...props}
            source={{
              uri: `${item.profilePhotoUrl}`,
            }}
          />
        )}
        style={styles.listItem}
        titleStyle={styles.listTitle}
        descriptionStyle={styles.listDescription}
      />
    </TouchableHighlight>
  )
}

export default React.memo(ChatContactItem)
