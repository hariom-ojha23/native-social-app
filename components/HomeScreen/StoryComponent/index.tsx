import React from 'react'
import { Pressable, Image } from 'react-native'
import { Surface } from 'react-native-paper'
import { View, Text } from '../../Themed'
import styles from './style'

interface StoryDetail {
  id: string
  url: string
}

const StoryComponent = (props: { item: StoryDetail }) => {
  const { item } = props
  return (
    <Pressable style={styles.container}>
      <Surface style={styles.innerContainer}>
        <Image style={styles.image} source={{ uri: `${item.url}` }} />
      </Surface>
    </Pressable>
  )
}

export default StoryComponent
