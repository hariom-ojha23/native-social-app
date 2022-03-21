import React, { useState, useEffect } from 'react'
import { ImageBackground } from 'react-native'
import { Avatar, Button, ToggleButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View } from '../../Themed'
import styles from './style'
import { db } from '../../../Firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

const ProfileInfoComponent = ({ setUserName }: any) => {
  const [mediaType, setMediaType] = useState('images')
  const [userId, setUserId] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [profileURL, setProfileURL] = useState<string>('')
  const [followerList, setFollowerList] = useState([])
  const [followerCount, setFollowerCount] = useState(0)
  const [followingList, setFollowingList] = useState([])
  const [followingCount, setFollowingCount] = useState(0)

  const addData = async (data: any) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data))
        .then(() => console.log('Data Added'))
        .catch((error) => console.log(error))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getUserId = async () => {
      AsyncStorage.getItem('uid')
        .then((res) => {
          setUserId(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    getUserId()
  }, [])

  useEffect(() => {
    if (userId !== null) {
      return onSnapshot(doc(db, 'users', userId), (snap) => {
        if (snap.data() !== undefined) {
          const data = snap.data()
          setBio(data?.bio)
          setDisplayName(data?.displayName)
          setUserName(data?.userName)
          setProfileURL(data?.profilePhotoUrl)
          addData(data)
        }
      })
    }
  }, [userId])

  useEffect(() => {
    if (userId !== null) {
      return onSnapshot(doc(db, 'followers', userId), (document) => {
        if (document.data() !== undefined) {
          const data = document.data()?.followerList
          if (data !== undefined) {
            setFollowerList(data)
            setFollowerCount(data.length)
          }
        }
      })
    }
  }, [userId])

  useEffect(() => {
    if (userId !== null) {
      return onSnapshot(doc(db, 'followings', userId), (document) => {
        if (document.data() !== undefined) {
          const data = document.data()?.followingList
          if (data !== undefined) {
            setFollowingList(data)
            setFollowingCount(data.length)
          }
        }
      })
    }
  }, [userId])

  return (
    <>
      <View style={{ position: 'relative' }}>
        <View style={styles.coverPhotoContainer}>
          <ImageBackground
            style={styles.coverPhoto}
            source={{
              uri: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
            resizeMode='cover'
          />
        </View>
        <View style={styles.profileInfo}>
          <View style={{ position: 'relative' }}>
            <View style={styles.profilePhotoContainer}>
              <Avatar.Image
                size={140}
                source={{
                  uri:
                    profileURL === ''
                      ? 'https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/default.jpg?alt=media&token=25fb473c-f799-4270-8a29-6de3350660c2'
                      : `${profileURL}`,
                }}
              />
            </View>
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text style={styles.bio}>{bio}</Text>

            <View style={styles.gridView}>
              <View style={[styles.gridItem, styles.horizontalDivider]}>
                <Text style={styles.count}>25</Text>
                <Text style={styles.gridText}>Posts</Text>
              </View>
              <View style={[styles.gridItem, styles.horizontalDivider]}>
                <Text style={styles.count}>
                  {followerCount ? followerCount : 0}
                </Text>
                <Text style={styles.gridText}>Followers</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.count}>
                  {followingCount ? followingCount : 0}
                </Text>
                <Text style={styles.gridText}>Following</Text>
              </View>
            </View>

            {/* <Button
              style={styles.followButton}
              mode='contained'
              onPress={() => console.log('Pressed')}
              labelStyle={styles.followBtnLabel}
            >
              Follow
            </Button> */}
            <ToggleButton.Row
              style={styles.toggleButtonContainer}
              onValueChange={(value) => setMediaType(value)}
              value={mediaType}
            >
              <ToggleButton icon='image-multiple' value='left' />
              <ToggleButton icon='video' value='right' />
            </ToggleButton.Row>
          </View>
        </View>
      </View>
    </>
  )
}

export default ProfileInfoComponent
