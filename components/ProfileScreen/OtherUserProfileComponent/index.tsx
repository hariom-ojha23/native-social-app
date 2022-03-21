import React, { useState, useEffect } from 'react'
import { ImageBackground } from 'react-native'
import { Avatar, Button, ToggleButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View } from '../../Themed'
import styles from './style'
import { db } from '../../../Firebase/config'
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

const ProfileInfoComponent = ({ setUserName, id }: any) => {
  const [mediaType, setMediaType] = useState('images')
  const [userId, setUserId] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [profileURL, setProfileURL] = useState<string>('')
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [isFollowing, setIsFollwing] = useState(false)

  const getData = async () => {
    AsyncStorage.getItem('uid')
      .then((res) => {
        if (res !== null) {
          setUserId(res)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeFromFollowerList = async () => {
    const followerRef = doc(db, 'followers', id)

    await updateDoc(followerRef, {
      followerList: arrayRemove(userId),
    })
      .then(() => {
        console.log('Removed from followers')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeFromFollowingList = async () => {
    const followingRef = doc(db, 'followings', userId)

    await updateDoc(followingRef, {
      followingList: arrayRemove(id),
    })
      .then(() => {
        console.log('Removed from followings')
        setIsFollwing(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addToFollowerList = async () => {
    const followerRef = doc(db, 'followers', id)

    await setDoc(
      followerRef,
      {
        followerList: arrayUnion(userId),
      },
      { merge: true }
    )
      .then(() => {
        console.log('added in followers')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const addToFollowingList = async () => {
    const followingRef = doc(db, 'followings', userId)

    await setDoc(
      followingRef,
      {
        followingList: arrayUnion(id),
      },
      { merge: true }
    )
      .then(() => {
        console.log('added in followings')
        setIsFollwing(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const FollowUnfollow = () => {
    if (isFollowing) {
      removeFromFollowerList()
      removeFromFollowingList()
    } else {
      addToFollowerList()
      addToFollowingList()
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (id !== null && id !== '' && id !== undefined) {
      return onSnapshot(doc(db, 'users', id), (snap) => {
        if (snap.data() !== undefined) {
          const data = snap.data()
          setBio(data?.bio)
          setDisplayName(data?.displayName)
          setUserName(data?.userName)
          setProfileURL(data?.profilePhotoUrl)
        }
      })
    }
  }, [id])

  useEffect(() => {
    if (id !== null && id !== '' && id !== undefined) {
      return onSnapshot(doc(db, 'followers', id), (document) => {
        if (document.data() !== undefined) {
          const data = document.data()?.followerList
          if (data !== undefined) {
            setFollowerCount(data.length)
            if (data.includes(userId)) {
              setIsFollwing(true)
            }
          }
        }
      })
    }
  }, [id, userId])

  useEffect(() => {
    if (id !== null && id !== '' && id !== undefined) {
      return onSnapshot(doc(db, 'followings', id), (document) => {
        if (document.data() !== undefined) {
          const data = document.data()?.followingList
          if (data !== undefined) {
            setFollowingCount(data.length)
          }
        }
      })
    }
  }, [id, userId])

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
                <Text style={styles.count}>{followerCount}</Text>
                <Text style={styles.gridText}>Followers</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.count}>{followingCount}</Text>
                <Text style={styles.gridText}>Following</Text>
              </View>
            </View>
            {userId !== id && (
              <Button
                style={styles.followButton}
                mode='contained'
                onPress={() => FollowUnfollow()}
                labelStyle={styles.followBtnLabel}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
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
