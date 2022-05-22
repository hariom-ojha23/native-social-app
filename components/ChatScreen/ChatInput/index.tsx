import React, { useEffect, useState } from 'react'
import { View, Text } from '../../Themed'
import { Easing, TextInput, Animated, Alert, BackHandler } from 'react-native'

import styles from './style'
import { IconButton } from 'react-native-paper'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { TouchableHighlight } from 'react-native-gesture-handler'
import EmojiPicker from '../Emoji/EmojiPicker'
import { useKeyboard } from '../../../hooks/useKeyboard'

type Props = {
  value: string
  sendMessage: Function
  setValue: any
}

const ChatInput = ({ value, setValue, sendMessage }: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [heightValue, setHeightValue] = useState(65)

  const isKeyBoardOpen = useKeyboard()

  useEffect(() => {
    if (showEmojiPicker) {
      setHeightValue(400)
    } else {
      setHeightValue(65)
    }
  }, [showEmojiPicker])

  useEffect(() => {
    if (isKeyBoardOpen) {
      setShowEmojiPicker(false)
    }
  }, [isKeyBoardOpen])

  const handleEmojiSelector = () => {
    if (isKeyBoardOpen) {
      setShowEmojiPicker(false)
      return
    }
    setShowEmojiPicker((val) => !val)
  }

  return (
    <Animated.View style={{ height: heightValue }}>
      <View style={styles.textInputContainer}>
        <View style={styles.fabBtn}>
          <IconButton
            size={25}
            icon="camera"
            color="white"
            onPress={() => console.log('Pressed')}
          />
        </View>

        <View style={styles.inputBox}>
          <IconButton
            size={25}
            color="black"
            icon={() =>
              showEmojiPicker ? (
                <Ionicons name="close-sharp" size={24} color="#A8A8A8" />
              ) : (
                <Entypo name="emoji-happy" size={24} color="#A8A8A8" />
              )
            }
            onPress={() => handleEmojiSelector()}
          ></IconButton>
          <TextInput
            placeholder="Write a message"
            style={styles.textInput}
            allowFontScaling={true}
            multiline
            value={value}
            onChangeText={setValue}
          />

          <TouchableHighlight
            style={styles.sendBtn}
            onPress={() => sendMessage()}
            underlayColor="#007bff"
            activeOpacity={0.5}
          >
            <Ionicons name="ios-send" size={24} color="white" />
          </TouchableHighlight>
        </View>
      </View>

      <EmojiPicker setValue={setValue} />
    </Animated.View>
  )
}

export default ChatInput
