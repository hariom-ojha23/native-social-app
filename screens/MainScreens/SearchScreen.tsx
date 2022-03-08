import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, Searchbar, List, Avatar } from 'react-native-paper'

import { RootStackParamList, RootStackScreenProps } from '../../types'
import { View } from '../../components/Themed'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'

import { db } from '../../Firebase/config'
import {
  collection,
  endAt,
  limit,
  orderBy,
  query,
  startAt,
  getDocs,
} from 'firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'

type Props = RootStackScreenProps<'Search'>

const SearchScreen = ({ navigation }: Props) => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  const [searchQuery, setSearchQuery] = useState('')
  const [userList, setUserList] = useState<any>([])

  const onChangeSearch = (queryString: string) => setSearchQuery(queryString)

  const searchUser = async () => {
    const userRef = collection(db, 'users')
    const q = query(
      userRef,
      orderBy('userName'),
      startAt(searchQuery.toLowerCase()),
      endAt(searchQuery.toLowerCase() + '\uf8ff'),
      limit(20)
    )

    const querySnapshot = await getDocs(q)

    const array: any = []

    querySnapshot.forEach((doc) => {
      array.push(doc.data())
    })

    setUserList(array)
  }

  useEffect(() => {
    if (searchQuery !== '') {
      searchUser()
    }
  }, [searchQuery])

  const renderUserList = ({ item }: any) => {
    return (
      <List.Item
        onPress={() =>
          navigation.navigate('OthersProfile', { id: item.uid } as any)
        }
        style={{ paddingHorizontal: 10, paddingVertical: 10 }}
        titleStyle={{ fontSize: 18 }}
        title={item?.displayName}
        description={`@${item?.userName}`}
        left={(props) => (
          <Avatar.Image
            {...props}
            size={50}
            source={{ uri: `${item?.profilePhotoUrl}` }}
          />
        )}
      />
    )
  }

  return (
    <>
      <Appbar.Header
        style={{ backgroundColor: colors.background, width: '100%' }}
      >
        <Appbar.BackAction
          style={{ width: '10%' }}
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Searchbar
          autoFocus={true}
          style={[styles.searchBar, { backgroundColor: colors.background }]}
          placeholder='Search User'
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Appbar.Header>

      {userList.length !== 0 && (
        <FlatList
          style={{ paddingVertical: 10, backgroundColor: colors.background }}
          data={userList}
          renderItem={renderUserList}
          keyExtractor={(item) => item.userName}
        />
      )}

      <View style={styles.container}></View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  searchBar: {
    elevation: 0,
    width: '85%',
  },
})

export default SearchScreen
