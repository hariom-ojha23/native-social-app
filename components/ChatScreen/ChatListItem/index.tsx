import React from 'react'
import { Text, View } from '../../Themed'
import { Avatar, List } from 'react-native-paper'
import styles from '../ChatListItem/style'

const ChatListItem = () => {
  const name = 'Hari om Ojha'
  const message = 'Haan bhai kya haal hai? kabhi message bhi kar liya karo'

  return (
    <List.Item
      title={name}
      description={message.length > 35 ? `${message.slice(0, 35)}...` : message}
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
      right={(props) => (
        <View {...props} style={styles.itemInfoBox}>
          <Text>1d ago</Text>
          <View style={styles.badge}>
            <Text style={{ color: 'white' }}>3</Text>
          </View>
        </View>
      )}
      style={styles.listItem}
      titleStyle={styles.listTitle}
      descriptionStyle={styles.listDescription}
    />
  )
}

export default ChatListItem
