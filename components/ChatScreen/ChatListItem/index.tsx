import React, { useEffect, useState } from 'react'
import { TouchableHighlight } from 'react-native'
import { Text, View } from '../../Themed'
import { Avatar, List } from 'react-native-paper'
import styles from '../ChatListItem/style'
import { RootStackScreenProps } from '../../../types'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../Firebase/config'
import { getDateAndTime } from '../../../hooks/commonFunction'

type Props = {
  navigation: NavigationProp<{
    ChatRoom: RootStackScreenProps<'ChatRoom'>
  }>
  route: RouteProp<{}>
  item: DocumentData
}

type UserDetail = {
  displayName: string
  profilePhotoUrl: string
}

const ChatListItem = ({ navigation, item }: Props) => {
  const [otherUser, setOtherUser] = useState<UserDetail>({
    displayName: '',
    profilePhotoUrl:
      'https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/default.jpg?alt=media&token=25fb473c-f799-4270-8a29-6de3350660c2',
  })

  const userId = auth.currentUser?.uid
  const otherUserId = item.members.filter((x: string) => x !== userId)[0]
  const message = item.recentMessage.messageText
  const sentAt = item.recentMessage.sentAt.seconds
  const members = [otherUserId, userId]

  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, 'users', otherUserId)
      const docSnap = await getDoc(userRef)
      if (docSnap.exists()) {
        const data: any = docSnap.data()
        setOtherUser(data)
      }
    }

    getUserData()
  }, [otherUserId])

  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('ChatRoom', {
          displayName: otherUser.displayName,
          profilePhotoUrl: otherUser.profilePhotoUrl,
          roomId: item.id,
          exist: true,
          members: members,
        } as any)
      }
      style={{ paddingHorizontal: 15 }}
      activeOpacity={1}
      underlayColor="#f5f5f5"
    >
      <List.Item
        title={otherUser.displayName}
        description={
          message.length > 35 ? `${message.slice(0, 35)}...` : message
        }
        left={(props) => (
          <Avatar.Image
            size={50}
            {...props}
            source={{
              uri: `${otherUser.profilePhotoUrl}`,
            }}
          />
        )}
        right={(props) => (
          <View {...props} style={styles.itemInfoBox}>
            <Text>{getDateAndTime(sentAt)}</Text>
            {/* <View style={styles.badge}>
              <Text style={{ color: 'white' }}>3</Text>
            </View> */}
          </View>
        )}
        style={styles.listItem}
        titleStyle={styles.listTitle}
        descriptionStyle={styles.listDescription}
      />
    </TouchableHighlight>
  )
}

export default React.memo(ChatListItem)
