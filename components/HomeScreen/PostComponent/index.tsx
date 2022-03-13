import React, { useState, useRef, useEffect } from 'react'
import { View, Image, Pressable, Modal } from 'react-native'
import { Avatar, Card, IconButton } from 'react-native-paper'
import { Ionicons, Feather } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Text } from '../../Themed'
import styles from './style'
import LottieView from 'lottie-react-native'
import { db } from '../../../Firebase/config'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import CommentModal from '../CommentModal'

const CardHeaderLeftContent = (props: any) => (
  <Avatar.Image size={45} source={{ uri: `${props.url}` }} />
)

const CardHeaderRightContent = () => (
  <Pressable
    style={({ pressed }) => ({
      opacity: pressed ? 0.5 : 1,
      marginRight: 5,
    })}
    onPress={() => console.log('pressed')}
  >
    <Feather name='more-vertical' size={24} color='#d3d3d3' />
  </Pressable>
)

type PostDetail = {
  author: {
    displayName: string
    userName: string
    profilePhotoUrl: string
  }
  createdAt: object
  description: string
  images: Array<string>
  likes: Array<string>
  id: string
}

type Id = string

const PostComponent = (props: { item: PostDetail; userId: Id }) => {
  const { item } = props
  const { userId } = props

  const animation = useRef<any>(null)
  const isFirstRun = useRef<any>(true)

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentModal, setCommentModal] = useState(false)

  useEffect(() => {
    if (item.likes.includes(userId)) {
      setIsLiked(true)
      setLikeCount(item.likes.length)
    } else {
      setIsLiked(false)
      setLikeCount(item.likes.length)
    }
  }, [item.likes])

  useEffect(() => {
    if (isFirstRun.current) {
      if (isLiked) {
        animation.current.play(66, 66)
      } else {
        animation.current.play(19, 19)
      }
      isFirstRun.current = false
    } else if (isLiked) {
      animation.current.play(20, 50)
    } else {
      animation.current.play(0, 19)
    }
  }, [isLiked])

  const likeOrUnlike = async () => {
    if (item.likes.includes(userId)) {
      const postRef = doc(db, 'posts', item.id)
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
      }).catch((error) => {
        console.log(error)
      })
    } else {
      const postRef = doc(db, 'posts', item.id)
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.author.displayName}
        titleStyle={styles.postTitle}
        subtitle={`@${item.author.userName}`}
        subtitleStyle={styles.postSubTitle}
        left={() => CardHeaderLeftContent({ url: item.author.profilePhotoUrl })}
        right={CardHeaderRightContent}
      />
      <View style={styles.contentContainer}>
        <Image style={styles.image} source={{ uri: `${item.images[0]}` }} />
        <BlurView intensity={80} tint='dark' style={styles.actionContainer}>
          <Card.Actions>
            <Pressable
              style={[styles.actionInnerContainer, { paddingLeft: 10 }]}
              onPress={() => likeOrUnlike()}
            >
              <LottieView
                ref={animation}
                style={styles.heart}
                source={require('../../../assets/lottie/like.json')}
                autoPlay={false}
                loop={false}
              />
              <Text style={styles.actionInfotext}>{likeCount}</Text>
            </Pressable>
            <View style={styles.actionInnerContainer}>
              <IconButton
                style={{ padding: 0, margin: 0 }}
                icon={() => (
                  <Ionicons name='chatbubble-sharp' size={22} color='#d3d3d3' />
                )}
                size={20}
                onPress={() => setCommentModal(true)}
              />
            </View>
            <View style={styles.actionInnerContainer}>
              <IconButton
                style={{ padding: 0, margin: 0 }}
                icon={() => <Ionicons name='send' size={22} color='#d3d3d3' />}
                size={20}
                onPress={() => setCommentModal(true)}
              />
            </View>
          </Card.Actions>
        </BlurView>
      </View>
      <CommentModal
        commentModal={commentModal}
        setCommentModal={setCommentModal}
        id={item.id}
      />
    </Card>
  )
}

export default PostComponent
