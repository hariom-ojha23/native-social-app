import React from 'react'
import { TouchableHighlight } from 'react-native'

import { Text, View } from '../../Themed'
import { Avatar, List } from 'react-native-paper'
import styles from '../ChatContactItem/style'
import { RootStackScreenProps } from '../../../types'

const ChatContactItem = ({
  navigation,
  route,
}: RootStackScreenProps<'ChatContacts'>) => {
  const name = 'Akash Kumar Sharma'
  const username = '@hari_om_ojha'

  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('ChatRoom')}
      style={{ paddingHorizontal: 15 }}
      activeOpacity={1}
      underlayColor="#f5f5f5"
    >
      <List.Item
        title={name}
        description={username}
        left={(props) => (
          <Avatar.Image
            size={50}
            {...props}
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/user%2FWTc4MP7gMQQYGBE3Y3xCM90N7793%2FprofilePhoto?alt=media&token=0d12aaeb-6411-4193-a6b0-33df74f139ee',
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

export default ChatContactItem
