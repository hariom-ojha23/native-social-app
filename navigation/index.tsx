import { Ionicons, AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable, TouchableOpacity } from 'react-native'
import { View } from '../components/Themed'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import RegisterScreen from '../screens/AuthScreens/RegisterScreen'
import CompleteProfileScreen from '../screens/AuthScreens/CompleteProfileScreen'
import SearchScreen from '../screens/MainScreens/SearchScreen'
import NotFoundScreen from '../screens/MainScreens/NotFoundScreen'
import HomeScreen from '../screens/MainScreens/HomeScreen'
import ChatScreen from '../screens/MainScreens/ChatScreen'
import NotificationScreen from '../screens/MainScreens/NotificationScreen'
import ProfileScreen from '../screens/MainScreens/ProfileScreen'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { auth } from '../Firebase/config'
import EditProfileScreen from '../screens/MainScreens/EditProfileScreen'
import OtherUserProfileScreen from '../screens/MainScreens/OtherUserProfileScreen'
import CreatePostScreen from '../screens/MainScreens/CreatePostScreen'

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const userInfo = auth.currentUser

  if (!userInfo) {
    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <AuthNavigator />
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name='EditProfile'
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='Search'
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='OthersProfile'
          component={OtherUserProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CompleteProfile'
        component={CompleteProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='MainStack'
        component={RootNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          height: 60,
          bottom: 15,
          left: 15,
          right: 15,
          position: 'absolute',
          borderRadius: 15,
        },
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Felix',
          tabBarIcon: ({ color }) => <IonIconIcon name='grid' color={color} />,
          headerStyle: {
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 24,
            letterSpacing: 1,
            fontWeight: '600',
          },
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Search')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 20,
              })}
            >
              <View
                style={{
                  padding: 3,
                  shadowColor: '#171717',
                  borderRadius: 8,
                  elevation: 20,
                }}
              >
                <Ionicons
                  name='search'
                  size={22}
                  color={Colors[colorScheme].text}
                />
              </View>
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => (
            <IonIconIcon name='chatbubble-sharp' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='CreatePost'
        component={CreatePostScreen}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                position: 'relative',
                bottom: 15,
                width: 60,
                height: 60,
                backgroundColor: Colors[colorScheme].tabActionButton,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 10,
              }}
            >
              <AntDesign size={30} name='plus' color='white' />
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name='Notification'
        component={NotificationScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <IonIconIcon name='notifications' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IonIconIcon name='person' color={color} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  )
}

const IonIconIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) => {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />
}

export default Navigation
