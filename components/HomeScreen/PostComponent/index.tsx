import React from 'react'
import { View, Image, Pressable } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Text } from '../../Themed'
import styles from './style'

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

interface PostDetail {
  author: {
    displayName: string
    userName: string
    profilePhotoUrl: string
  }
  comments: Array<object>
  createdAt: object
  description: string
  images: Array<string>
  likes: Array<object>
}

const PostComponent = (props: { item: PostDetail }) => {
  const { item } = props
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
              <Pressable>
                <AntDesign name='heart' size={22} color='red' />
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
    </Card>
  )
}

export default PostComponent
