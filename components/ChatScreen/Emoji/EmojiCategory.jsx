import React, { memo } from 'react'
import { FlatList, Dimensions } from 'react-native'

import Emoji from './Emoji'
import { emojisByCategory } from '../../../assets/emoji/emojis'

const EmojiCategory = ({ category, setValue }) => {
  return (
    <FlatList
      data={emojisByCategory[category]}
      renderItem={({ item }) => <Emoji item={item} setValue={setValue} />}
      keyExtractor={(item) => item}
      numColumns={8}
    />
  )
}

export default memo(EmojiCategory)
