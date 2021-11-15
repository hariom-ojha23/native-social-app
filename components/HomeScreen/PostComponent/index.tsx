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
  id: string
  fullName: string
  userName: string
  url: string
}

const PostComponent = (props: { item: PostDetail }) => {
  const { item } = props
  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.fullName}
        titleStyle={styles.postTitle}
        subtitle={item.userName}
        subtitleStyle={styles.postSubTitle}
        left={() => CardHeaderLeftContent({ url: item.url })}
        right={CardHeaderRightContent}
      />
      <View style={styles.contentContainer}>
        <Image style={styles.image} source={{ uri: `${item.url}` }} />
        <BlurView intensity={80} tint='dark' style={styles.actionContainer}>
          <Card.Actions>
            <View style={styles.actionInnerContainer}>
              <Pressable>
                <AntDesign name='heart' size={22} color='red' />
              </Pressable>
              <Text style={styles.actionInfotext}>12T</Text>
            </View>
            <View style={styles.actionInnerContainer}>
              <Pressable>
                <Ionicons name='chatbubble-sharp' size={22} color='#d3d3d3' />
              </Pressable>
              <Text style={styles.actionInfotext}>7B</Text>
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
