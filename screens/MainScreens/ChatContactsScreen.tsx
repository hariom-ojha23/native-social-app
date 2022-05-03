import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { RootStackScreenProps } from '../../types'

import { Text, View } from '../../components/Themed'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'

import ChatContactItem from '../../components/ChatScreen/ChatContactItem'

type Props = RootStackScreenProps<'ChatContacts'>
const ChatContactsScreen = ({ navigation, route }: Props) => {
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
        placeholder="Search Contact"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBox}
      />
      <View style={styles.contactListContainer}>
        <FlatList
          data={DATA}
          renderItem={() => (
            <ChatContactItem route={route} navigation={navigation} />
          )}
          keyExtractor={(item) => item.toString()}
          style={styles.contactList}
          ListFooterComponent={() => (
            <View
              style={{
                height: 100,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                <Ionicons name="lock-closed" size={16} color={colors.text} />{' '}
                Messages are end-to-end encrypted
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
    marginBottom: 50,
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
  contactListContainer: {
    width: '100%',
  },
  contactList: {
    backgroundColor: 'transparent',
  },
})

export default ChatContactsScreen
