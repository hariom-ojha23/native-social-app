import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Appbar } from 'react-native-paper'
import { View } from '../../components/Themed'
import { posts } from '../../FakeData/posts'

import { RootStackScreenProps } from '../../types'
import OtherUserProfileComponent from '../../components/ProfileScreen/OtherUserProfileComponent'
import PostListComponent from '../../components/ProfileScreen/PostListComponent'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'

type Props = RootStackScreenProps<'OthersProfile'>

const OtherUserProfileScreen = ({ navigation, route }: Props) => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  const [userName, setUserName] = useState('')
  const [uid, setUid] = useState('')

  useEffect(() => {
    if (route.params !== undefined) {
      const id = route.params.id
      setUid(id)
    }
  }, [])

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction
          style={{ width: '10%' }}
          onPress={() => navigation.pop(2)}
        />
        <Appbar.Content title={userName} />
      </Appbar.Header>
      <View style={styles.safeView}>
        <FlatList
          ListHeaderComponent={
            <OtherUserProfileComponent setUserName={setUserName} id={uid} />
          }
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={PostListComponent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          numColumns={2}
          horizontal={false}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  columnWrapperStyle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  animatedView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
    paddingVertical: 20,
  },
  bottomSheetHandle: {
    width: 50,
    height: 6,
    backgroundColor: 'gray',
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 15,
  },
  listItem: {
    color: 'black',
    paddingHorizontal: 25,
  },
  listIcon: {
    alignSelf: 'center',
    color: 'gray',
    marginRight: 30,
    fontSize: 24,
  },
})

export default OtherUserProfileScreen
