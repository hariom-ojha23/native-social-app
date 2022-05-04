import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import { View, Text } from '../../components/Themed'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'
import { Appbar, Avatar, IconButton } from 'react-native-paper'
import { RootStackScreenProps } from '../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { Ionicons, Entypo } from '@expo/vector-icons'

type Props = RootStackScreenProps<'ChatRoom'>

const ChatRoomScreen = ({ navigation, route }: Props) => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  const [value, setValue] = useState('')

  const DATA = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
  ]

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Avatar.Image
          size={30}
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/user%2FWTc4MP7gMQQYGBE3Y3xCM90N7793%2FprofilePhoto?alt=media&token=0d12aaeb-6411-4193-a6b0-33df74f139ee',
          }}
        />
        <Appbar.Content title="Hari om Ojha" subtitle="Online" />
      </Appbar.Header>

      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}
      >
        <FlatList
          inverted
          data={DATA}
          renderItem={({ item }) => (
            <View>
              {item % 2 !== 0 ? (
                <View
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    borderBottomStartRadius: 0,
                    marginVertical: 10,
                    alignSelf: 'flex-start',
                    maxWidth: '75%',
                  }}
                >
                  <Text style={{ textAlign: 'left', fontSize: 17 }}>
                    Hey Buddy! How are you?
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    alignSelf: 'flex-end',
                    backgroundColor: '#0080ff',
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    borderBottomEndRadius: 0,
                    maxWidth: '75%',
                    marginVertical: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 16,
                      color: 'white',
                      lineHeight: 22,
                    }}
                  >
                    Contrary to popular belief,It has roots in a piece of
                    classical Latin literature from 45 BC
                    {/* Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in */}
                    Virginia
                  </Text>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.toString()}
          style={styles.chatList}
        />

        <View style={styles.inputContainer}>
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
              icon={() => <Entypo name="emoji-happy" size={24} color="grey" />}
              onPress={() => console.log('Pressed')}
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
              onPress={() => console.log('Pressed')}
              underlayColor="#007bff"
              activeOpacity={0.5}
            >
              <Ionicons name="ios-send" size={24} color="white" />
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  chatList: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fabBtn: {
    width: '12%',
    height: 50,
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'purple',
    borderRadius: 25,
  },
  inputBox: {
    backgroundColor: '#f2f2f2',
    width: '88%',
    minHeight: 50,
    maxHeight: 80,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  sendBtn: {
    width: 46,
    height: 46,
    backgroundColor: '#007bff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
})

export default ChatRoomScreen
