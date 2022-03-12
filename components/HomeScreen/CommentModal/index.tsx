import { Ionicons } from '@expo/vector-icons'
import React, { useState, useRef, useEffect, Dispatch } from 'react'
import { Modal, TextInput, FlatList } from 'react-native'
import { Avatar, Surface, Title, IconButton } from 'react-native-paper'
import { Text, View } from '../../Themed'
import useColorScheme from '../../../hooks/useColorScheme'
import Colors from '../../../constants/Colors'
import styles from './style'

const CommentComponent = () => {
  return (
    <View style={{ paddingVertical: 10 }}>
      <View style={styles.commentBox}>
        <View style={styles.avatarPart}>
          <Avatar.Image
            size={45}
            source={{
              uri: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          />
        </View>
        <View style={styles.commentPart}>
          <Text style={{ fontSize: 20, margin: 0 }}>Aditya Shrivastav</Text>
          <Text style={{ fontSize: 14, margin: 0 }}>@aditya</Text>
          <View style={{ paddingTop: 10 }}>
            <Text>Very Nice Photos</Text>
          </View>
        </View>
        <View style={styles.timePart}>
          <Text>16 m</Text>
        </View>
      </View>
    </View>
  )
}

const CommentModal = (props: {
  commentModal: boolean
  setCommentModal: Dispatch<boolean>
}) => {
  const { commentModal, setCommentModal } = props
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  return (
    <Modal
      animationType='slide'
      visible={commentModal}
      onRequestClose={() => setCommentModal(false)}
      style={{ borderStartColor: 'red' }}
    >
      <View style={{ height: '100%' }}>
        <Surface style={styles.commentHeader}>
          <Title style={{ fontWeight: '600' }}>Comments</Title>
        </Surface>

        <FlatList
          data={[0, 1, 2, 3]}
          renderItem={() => <CommentComponent />}
          keyExtractor={(item) => item.toString()}
        />

        <View style={styles.inputBox}>
          <View style={styles.avatarPart}>
            <Avatar.Image
              size={45}
              source={{
                uri: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              }}
            />
          </View>

          <TextInput
            placeholder='Write Your Comment'
            placeholderTextColor={colors.text ? colors.text : 'gray'}
            keyboardType='default'
            style={[styles.input, { color: 'colors.text' }]}
            multiline={true}
          />
          <IconButton
            style={styles.sendButton}
            icon={() => <Ionicons name='send' size={24} color='#007fff' />}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
    </Modal>
  )
}

export default CommentModal
