import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Searchbar } from 'react-native-paper'

import { Text, View } from '../../components/Themed'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'

import ChatListItem from '../../components/ChatScreen/ChatListItem'

const ChatScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  const onChangeSearch = (query: string) => setSearchQuery(query)

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
  ]

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Searchbar
        placeholder="Search Chat"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBox}
      />
      <View style={styles.chatListContainer}>
        <FlatList
          data={DATA}
          renderItem={ChatListItem}
          keyExtractor={(item) => item.toString()}
          style={styles.chatList}
          ListFooterComponent={() => (
            <View
              style={{
                height: 100,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                All messages are end-to-end encrypted
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBox: {
    borderRadius: 25,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  onlineUserBox: {
    height: 100,
    width: '100%',
    marginBottom: 10,
    paddingTop: 10,
  },
  chatListContainer: {
    width: '100%',
  },
  chatList: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
})

export default ChatScreen
