import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect, Dispatch } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Modal, TextInput, FlatList } from 'react-native'
import { Avatar, Surface, Title, IconButton } from 'react-native-paper'
import { Text, View } from '../../Themed'
import useColorScheme from '../../../hooks/useColorScheme'
import Colors from '../../../constants/Colors'
import styles from './style'
import moment from 'moment'

import { db } from '../../../Firebase/config'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  serverTimestamp,
} from 'firebase/firestore'

type Comment = {
  author: {
    uid: string
    displayName: string
    userName: string
    profilePhotoUrl: string
  }
  comment: string
  createdAt: {
    nanoseconds: number
    seconds: number
  }
  id: string
}

const CommentComponent = (props: { item: Comment }) => {
  const { item } = props

  const getTime = (sec: number) => {
    const str = moment(new Date(sec * 1000)).fromNow()

    switch (str) {
      case 'in a few seconds':
        return 'few sec'
      case 'a few seconds ago':
        return 'few sec'
      case 'a minute ago':
        return '1m'
      case 'an hour ago':
        return '1h'
      case 'a day ago':
        return '1day'
      default:
        const first = str.split(' ')[0]
        let mid = str.split(' ')[1]
        if (mid === 'minutes' || mid === 'minute') {
          mid = 'm'
        }
        if (mid === 'hours' || mid === 'hour') {
          mid = 'h'
        }
        return first + mid
    }
  }

  return (
    <View style={{ paddingVertical: 10 }}>
      {item && (
        <View style={styles.commentBox}>
          <View style={styles.avatarPart}>
            <Avatar.Image
              size={45}
              source={{
                uri: `${item.author.profilePhotoUrl}`,
              }}
            />
          </View>
          <View style={styles.commentPart}>
            <Text style={{ fontSize: 20, margin: 0 }}>
              {item.author.displayName}
            </Text>
            <Text style={{ fontSize: 14, margin: 0 }}>
              {`@${item.author.userName}`}
            </Text>
            <View style={{ paddingTop: 10 }}>
              <Text>{item.comment}</Text>
            </View>
          </View>
          <View style={styles.timePart}>
            {item.createdAt !== null && (
              <Text>{getTime(item.createdAt.seconds)}</Text>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

const CommentModal = (props: {
  commentModal: boolean
  setCommentModal: Dispatch<boolean>
  id: string
}) => {
  const { commentModal, setCommentModal, id } = props
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  type Author = {
    uid: string
    displayName: string
    userName: string
    profilePhotoUrl: string
  }

  const [comment, setComment] = useState<string>('')
  const [commentList, setCommentList] = useState([])
  const [author, setAuthor] = useState<Author>()

  useEffect(() => {
    const q = query(
      collection(db, 'posts', id, 'comments'),
      orderBy('createdAt', 'desc'),
      limit(50)
    )

    return onSnapshot(q, (col) => {
      const arr: any = []
      col.docs.forEach((document) => {
        const data = document.data()
        data['id'] = document.id
        arr.push(data)
      })
      setCommentList(arr)
    })
  }, [])

  useEffect(() => {
    const getAuthorData = () => {
      AsyncStorage.getItem('userData')
        .then((res) => {
          if (res !== null) {
            const data = JSON.parse(res)
            setAuthor(data)
          }
        })
        .catch((error) => console.log(error))
    }

    return getAuthorData()
  }, [])

  const postComment = async () => {
    if (comment.length !== 0) {
      const commentRef = collection(db, 'posts', id, 'comments')

      await addDoc(commentRef, {
        comment,
        createdAt: serverTimestamp(),
        author: {
          uid: author?.uid,
          displayName: author?.displayName,
          userName: author?.userName,
          profilePhotoUrl: author?.profilePhotoUrl,
        },
      })
        .then(() => {
          setComment('')
          console.log('Comment Added')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <Modal
      animationType='slide'
      visible={commentModal}
      onRequestClose={() => setCommentModal(false)}
      style={{ borderStartColor: 'red' }}
    >
      {commentList && (
        <View style={{ height: '100%' }}>
          <Surface style={styles.commentHeader}>
            <Title style={{ fontWeight: '600' }}>Comments</Title>
          </Surface>

          <FlatList
            data={commentList}
            renderItem={({ item }) => <CommentComponent item={item} />}
            keyExtractor={(_, index) => index.toString()}
          />

          <Surface style={styles.inputBox}>
            <Surface style={styles.avatarPart}>
              <Avatar.Image
                size={45}
                source={{
                  uri: `${author?.profilePhotoUrl}`,
                }}
              />
            </Surface>

            <TextInput
              placeholder='Write Your Comment'
              placeholderTextColor={colors.text ? colors.text : 'gray'}
              keyboardType='default'
              style={[styles.input, { color: colors.text }]}
              multiline={true}
              autoFocus={true}
              value={comment}
              onChangeText={(val) => setComment(val)}
            />
            <IconButton
              style={styles.sendButton}
              icon={() => <Ionicons name='send' size={28} color='#007fff' />}
              onPress={() => postComment()}
            />
          </Surface>
        </View>
      )}
    </Modal>
  )
}

export default CommentModal
