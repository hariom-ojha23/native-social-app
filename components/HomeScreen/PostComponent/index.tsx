import React, { useState, useRef, useEffect, Dispatch } from 'react'
import { View, Image, Pressable } from 'react-native'
import {
  Avatar,
  Badge,
  Caption,
  Card,
  Divider,
  IconButton,
  Menu,
  Snackbar,
  Subheading,
} from 'react-native-paper'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Text } from '../../Themed'
import styles from './style'
import LottieView from 'lottie-react-native'
import { db, storage } from '../../../Firebase/config'
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore'
import CommentModal from '../CommentModal'
import { deleteObject, ref } from 'firebase/storage'
import Swiper from 'react-native-swiper'

const CardHeaderLeftContent = (props: any) => (
  <Avatar.Image size={47} source={{ uri: `${props.url}` }} />
)

const CardHeaderRightContent = (props: { setOpen: Dispatch<boolean> }) => {
  const { setOpen } = props
  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        marginRight: 5,
      })}
      onPress={() => setOpen(true)}
    >
      <Feather name='more-vertical' size={24} color='gray' />
    </Pressable>
  )
}

type PostDetail = {
  author: {
    uid: string
    displayName: string
    userName: string
    profilePhotoUrl: string
  }
  createdAt: object
  description: string
  images: [
    {
      url: string
      id: string
    }
  ]
  likes: Array<string>
  id: string
}

type Id = string

const PostComponent = (props: {
  item: PostDetail
  userId: Id
  show: boolean
  message: string | null
  setShow: Dispatch<boolean>
  setMessage: Dispatch<string | null>
}) => {
  const { item } = props
  const { userId } = props
  const { show, setShow, message, setMessage } = props

  const animation = useRef<any>(null)
  const isFirstRun = useRef<any>(true)

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentModal, setCommentModal] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

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

  useEffect(() => {
    const savedPostsRef = doc(db, 'savedPosts', userId)
    return onSnapshot(savedPostsRef, (doc) => {
      if (doc.exists()) {
        const data: Array<string> = doc.data().postList
        if (data.includes(item.id)) {
          setIsSaved(true)
        }
      }
    })
  }, [item])

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

  const deletePost = async () => {
    await deleteDoc(doc(db, 'posts', item.id))
      .then(() => {
        item.images.forEach((x) => {
          const imgRef = ref(storage, `user/${userId}/posts/${x.id}`)

          deleteObject(imgRef)
            .then(() => {
              console.log('Image deleted successfully')
              setOpenMenu(false)
            })
            .catch((error) => console.log(error))
        })
      })
      .then(() => {
        console.log('Post Deleted Successfully')
      })
      .catch((error) => console.log(error))
  }

  const savePost = async () => {
    const savedPostsRef = doc(db, 'savedPosts', userId)

    await setDoc(
      savedPostsRef,
      {
        postList: arrayUnion(item.id),
      },
      { merge: true }
    )
      .then(() => {
        console.log('added in postList')
        setMessage('Post added in Saved Post List')
        setShow(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeFromSavedPosts = async () => {
    const savedPostsRef = doc(db, 'savedPosts', userId)

    await updateDoc(savedPostsRef, {
      postList: arrayRemove(item.id),
    })
      .then(() => {
        console.log('removed from postList')
        setMessage('Post removed from Saved Post List')
        setShow(true)
        setIsSaved(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.author.displayName}
        titleStyle={styles.postTitle}
        subtitle={`@${item.author.userName}`}
        subtitleStyle={styles.postSubTitle}
        left={() => CardHeaderLeftContent({ url: item.author.profilePhotoUrl })}
        right={() => (
          <Menu
            visible={openMenu}
            onDismiss={() => setOpenMenu(false)}
            anchor={<CardHeaderRightContent setOpen={setOpenMenu} />}
          >
            <Menu.Item
              icon={() => (
                <Ionicons
                  name='md-bookmark-outline'
                  size={22}
                  color='#007bff'
                />
              )}
              title={!isSaved ? 'Save Post' : 'Remove Post'}
              onPress={
                !isSaved ? () => savePost() : () => removeFromSavedPosts()
              }
            />
            {userId === item.author.uid && (
              <>
                <Divider />
                <Menu.Item
                  icon={() => (
                    <MaterialIcons
                      name='delete-outline'
                      size={24}
                      color='#e3242b'
                    />
                  )}
                  title='Delete Post'
                  onPress={() => deletePost()}
                />
              </>
            )}
          </Menu>
        )}
      />

      <View style={styles.captionView}>
        <Text style={styles.caption}>{item.description}</Text>
      </View>

      <View>
        {item.images.length > 1 ? (
            <Swiper
              showsPagination={true}
              height={350}
              loop={false}
              horizontal={true}
              paginationStyle={{bottom: -30}}
            >
              {item.images.map((item, index) => (
                <View key={index} style={styles.slide}>
                  <Image style={styles.image} source={{ uri: item.url }} />
                </View>
              ))}
            </Swiper>
        ) : (
          <Image style={styles.image} source={{ uri: item.images[0].url }} />
        )}

        <Card.Actions style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
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
                  <Ionicons name='chatbubble-sharp' size={22} color='gray' />
                )}
                size={20}
                onPress={() => setCommentModal(true)}
              />
            </View>
          </View>

          <View style={styles.actionInnerContainer}>
            <IconButton
              style={{ padding: 0, margin: 0 }}
              icon={() => <Ionicons name='send' size={22} color='gray' />}
              size={20}
              onPress={() => setCommentModal(true)}
            />
          </View>
        </Card.Actions>
      </View>
      <CommentModal
        commentModal={commentModal}
        setCommentModal={setCommentModal}
        id={item.id}
      />
      <Snackbar
        visible={show}
        onDismiss={() => setShow(false)}
        action={{
          label: 'Close',
          onPress: () => {
            setShow(false)
          },
        }}
      >
        {message}
      </Snackbar>
    </Card>
  )
}

export default PostComponent
