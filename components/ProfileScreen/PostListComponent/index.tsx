import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styles from './style'

interface PostListItem {
  id: string
  url: string
}

const PostListComponent = (props: { item: PostListItem }) => {
  const { item } = props
  return (
    <TouchableOpacity style={styles.postContainer}>
      <Image style={styles.postImage} source={{ uri: `${item.url}` }} />
    </TouchableOpacity>
  )
}

export default PostListComponent
