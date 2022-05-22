import React, { memo } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import shortnameToUnicode from '../../../constants/shortnameToUnicode'

const Emoji = ({ item, setValue }) => {
  return (
    <TouchableOpacity
      style={styles.emojiContainer}
      onPress={() =>
        setValue((value) => value + shortnameToUnicode[`:${item}:`])
      }
    >
      <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: 10.5,
  },
  emoji: {
    fontSize: 25,
  },
})

export default Emoji
