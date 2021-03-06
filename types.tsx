/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>
  Search: undefined
  NotFound: undefined
  Login: undefined
  Register: undefined
  CompleteProfile: undefined
  MainStack: undefined
  EditProfile: undefined
  Profile: undefined
  OthersProfile: undefined
  ChatContacts: undefined
  ChatRoom: undefined
}

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  Home: undefined
  Chat: undefined
  Notification: undefined
  Profile: undefined
  CreatePost: undefined
  ActionButton: undefined
}

export type RootTabScreenProps<
  Screen extends keyof RootTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type ContactItem = {
  displayName: string
  userName: string
  profilePhotoUrl: string
  uid: string
  roomId: string
}
