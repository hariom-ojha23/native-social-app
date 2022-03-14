import React, { useState } from 'react'
import { StyleSheet, FlatList, useWindowDimensions } from 'react-native'
import { Appbar, List } from 'react-native-paper'
import { View } from '../../components/Themed'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { posts } from '../../FakeData/posts'

import { RootStackScreenProps } from '../../types'
import ProfileInfoComponent from '../../components/ProfileScreen/ProfileInfoComponent'
import PostListComponent from '../../components/ProfileScreen/PostListComponent'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'

const SpringConfig = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
}

const ProfileScreen = ({ navigation }: RootStackScreenProps<'MainStack'>) => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  const [userName, setUserName] = useState('')

  const dimensions = useWindowDimensions()
  const top = useSharedValue(dimensions.height + 100)

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SpringConfig),
    }
  })

  const onPress = () => {
    top.value = withSpring(dimensions.height / 2 + 100, SpringConfig)
  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.startTop = top.value
    },

    onActive(event, context) {
      top.value = context.startTop + event.translationY
    },

    onEnd() {
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height + 100
      } else {
        top.value = dimensions.height / 2 + 100
      }
    },
  })

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.Content title={userName} />
        <Appbar.Action icon='menu-open' onPress={onPress} />
      </Appbar.Header>
      <View style={styles.safeView}>
        <FlatList
          style={styles.postList}
          ListHeaderComponent={
            <ProfileInfoComponent setUserName={setUserName} />
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
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            styles.animatedView,
            style,
            {
              top: dimensions.height + 100,
              backgroundColor: colors.background,
            },
          ]}
        >
          <View style={styles.bottomSheetHandle} />
          <View>
            <List.Item
              style={styles.listItem}
              title='Edit Profile'
              left={() => <Feather style={styles.listIcon} name='edit' />}
              onPress={() => navigation.navigate('EditProfile')}
            />
            <List.Item
              style={styles.listItem}
              title='Settings'
              left={() => (
                <Ionicons style={styles.listIcon} name='settings-outline' />
              )}
              onPress={() => console.log('settings')}
            />
            <List.Item
              style={styles.listItem}
              title='Saved Posts'
              left={() => (
                <Ionicons style={styles.listIcon} name='bookmark-outline' />
              )}
              onPress={() => console.log('saved posts')}
            />
            <List.Item
              style={styles.listItem}
              title='Logout'
              left={() => <AntDesign style={styles.listIcon} name='logout' />}
              onPress={() => console.log('logout')}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  postList: {
    marginBottom: 60,
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

export default ProfileScreen
