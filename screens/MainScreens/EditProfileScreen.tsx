import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native'
import { View } from '../../components/Themed'

import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { useKeyboard } from '../../hooks/useKeyboard'
import { RootStackScreenProps } from '../../types'
import { auth, db, storage } from '../../Firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker'
import { Avatar, IconButton, Snackbar, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditProfileScreen = ({
  navigation,
}: RootStackScreenProps<'EditProfile'>) => {
  const { currentUser } = auth

  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]
  const isKeyBoardOpen = useKeyboard()

  const [profilePhoto, setProfilePhoto] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/social-app-9923d.appspot.com/o/default.jpg?alt=media&token=25fb473c-f799-4270-8a29-6de3350660c2'
  )
  const [userId, setUserId] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [photoURL, setPhotoURL] = useState<string | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  // get user data from AsyncStorage
  useEffect(() => {
    const getUserData = async () => {
      AsyncStorage.getItem('userData')
        .then((res) => {
          if (res !== null) {
            const data = JSON.parse(res)
            setBio(data.bio)
            setUserName(data.userName)
            setEmail(data.email)
            setProfilePhoto(data.profilePhotoUrl)
            setDisplayName(data.displayName)
            setUserId(data.uid)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    getUserData()
  }, [])

  // selecting profile pic
  const pickProfilePicture = async () => {
    try {
      let photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      })
      if (!photo.cancelled) {
        setProfilePhoto(photo.uri)
        uploadPhotoToStorage(photo.uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const uploadPhotoToStorage = async (uri: string) => {
    try {
      const response = await fetch(uri)
      const imageBlob = await response.blob()

      const storageRef = ref(storage, `users/${currentUser?.uid}/profilePhoto`)
      const uploadTask = uploadBytesResumable(storageRef, imageBlob)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          const errMessage = error.code.split('/')[1]
          setMessage(errMessage)
          setShow(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPhotoURL(downloadURL)
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleSnackClose = () => {
    setShow(false)
  }

  const updateDetails = async () => {
    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, {
      displayName,
      bio,
      userName,
      email,
    })
      .then(() => {
        setShow(true)
        setMessage('Details updated successfully!')
      })
      .catch((error) => {
        setMessage(error.code.split('/')[1] || error.message)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.controllerContainer}>
        <IconButton
          style={styles.controller}
          icon='close'
          color={colors.text}
          size={24}
          onPress={() => navigation.navigate('Profile')}
        />
        <IconButton
          style={styles.controller}
          icon='check'
          color={colors.text}
          size={24}
          onPress={() => updateDetails()}
        />
      </View>
      {!isKeyBoardOpen && (
        <View style={styles.selectProfileContainer}>
          <Avatar.Image size={120} source={{ uri: profilePhoto }} />

          <IconButton
            style={styles.cameraButton}
            icon='camera'
            color='white'
            size={24}
            onPress={() => pickProfilePicture()}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode='outlined'
          value={displayName}
          label='Display Name'
          textContentType='name'
          onChange={(e) => setDisplayName(e.nativeEvent.text)}
          left={<TextInput.Icon name='account' color='gray' />}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          value={userName}
          label='User Name'
          textContentType='username'
          onChange={(e) => setUserName(e.nativeEvent.text)}
          left={<TextInput.Icon name='account' color='gray' />}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          value={bio}
          label='Bio'
          textContentType='none'
          onChange={(e) => setBio(e.nativeEvent.text)}
          left={<TextInput.Icon name='information' color='gray' />}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          value={email}
          label='Email'
          textContentType='emailAddress'
          onChange={(e) => setEmail(e.nativeEvent.text)}
          left={<TextInput.Icon name='email' color='gray' />}
        />
      </View>
      <Snackbar
        visible={show}
        onDismiss={handleSnackClose}
        action={{
          label: 'Close',
          onPress: () => {
            setShow(false)
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  controllerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 50,
  },
  controller: {
    marginHorizontal: 25,
  },
  selectProfileContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  cameraButton: {
    position: 'absolute',
    backgroundColor: '#007fff',
    right: -10,
    borderColor: 'white',
    borderWidth: 1.5,
  },
  inputContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    marginTop: 12,
    borderStartColor: 'white',
  },
})

export default EditProfileScreen
