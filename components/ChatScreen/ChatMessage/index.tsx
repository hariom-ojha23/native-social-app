import React from 'react'
import { View, Text } from '../../Themed'
import styles from './style'
import { DocumentData } from 'firebase/firestore'
import { auth } from '../../../Firebase/config'
import { getDateAndTime } from '../../../hooks/commonFunction'

type ChatMessageProps = {
  item: DocumentData
}

const ChatMessage = ({ item }: ChatMessageProps) => {
  const userId = auth.currentUser?.uid

  const isMyMessage = (id: string) => {
    return id === userId
  }

  return (
    <View>
      <View
        style={[
          styles.chatView,
          {
            alignSelf: isMyMessage(item.sentBy) ? 'flex-end' : 'flex-start',
            borderBottomEndRadius: isMyMessage(item.sentBy) ? 0 : 20,
            borderBottomStartRadius: isMyMessage(item.sentBy) ? 20 : 0,
            backgroundColor: isMyMessage(item.sentBy) ? '#007fff' : '#f5f5f5',
          },
        ]}
      >
        <Text
          style={{
            textAlign: isMyMessage(item.sentBy) ? 'right' : 'left',
            fontSize: 15,
            color: isMyMessage(item.sentBy) ? 'white' : 'black',
          }}
        >
          {item.messageText}
        </Text>
      </View>
      {/* <Text
        style={{
          textAlign: isMyMessage(item.sentBy) ? 'right' : 'left',
          color: 'gray',
          fontSize: 13,
          marginBottom: 10,
        }}
      >
        {getDateAndTime(item.sentAt.seconds)}
      </Text> */}
    </View>
  )
}

export default React.memo(ChatMessage)
