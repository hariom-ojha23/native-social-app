import React from 'react'
import { View, Image } from 'react-native'
import styles from './style'

interface PostListItem {
  id: string
  url: string
}

const PostListComponent = (props: { item: PostListItem }) => {
  const { item } = props
  return (
    <View style={styles.postContainer}>
      <Image style={styles.postImage} source={{ uri: `${item.url}` }} />
    </View>
  )
}

export default PostListComponent
