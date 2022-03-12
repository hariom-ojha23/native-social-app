import React, { useState, useRef, useEffect } from 'react'
import { View, Image, Pressable } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { Ionicons, Feather } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Text } from '../../Themed'
import styles from './style'
import LottieView from 'lottie-react-native'
import { db } from '../../../Firebase/config'
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'

const CardHeaderLeftContent = (props: any) => (
  <Avatar.Image size={40} source={{ uri: `${props.url}` }} />
)

const CardHeaderRightContent = () => (
  <Pressable
    style={({ pressed }) => ({
      opacity: pressed ? 0.5 : 1,
      marginRight: 5,
    })}
    onPress={() => console.log('pressed')}
  >
    <Feather name='more-vertical' size={24} />
  </Pressable>
)

type PostDetail = {
  author: {
    displayName: string
    userName: string
    profilePhotoUrl: string
  }
  comments: Array<object>
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
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (item.likes.includes(userId)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [item.likes])

  useEffect(() => {
    if (isLiked) {
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
      })
        .then(() => {
          setIsLiked(false)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      const postRef = doc(db, 'posts', item.id)
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
      })
        .then(() => {
          setIsLiked(true)
        })
        .catch((error) => {
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
            <View style={styles.actionInnerContainer}>
              <Pressable onPress={() => likeOrUnlike()}>
                <LottieView
                  ref={animation}
                  style={styles.heart}
                  source={require('../../../assets/lottie/like.json')}
                  autoPlay={false}
                  loop={false}
                />
              </Pressable>
              <Text style={styles.actionInfotext}>{item.likes.length}</Text>
            </View>
            <View style={styles.actionInnerContainer}>
              <Pressable>
                <Ionicons name='chatbubble-sharp' size={22} color='#d3d3d3' />
              </Pressable>
              <Text style={styles.actionInfotext}>{item.comments.length}</Text>
            </View>
            <View style={styles.actionInnerContainer}>
              <Pressable>
                <Ionicons name='send' size={22} color='#d3d3d3' />
              </Pressable>
            </View>
          </Card.Actions>
        </BlurView>
      </View>
      {/* {userId !== undefined && item.likes.includes(userId) ? (
                  <Ionicons name='ios-heart' size={25} color='#d3d3d3' />
                ) : (
                  <Ionicons
                    name='ios-heart-outline'
                    size={25}
                    color='#d3d3d3'
                  />
                )} */}
    </Card>
  )
}

export default PostComponent
