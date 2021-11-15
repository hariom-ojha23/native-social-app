import React, { useState, useEffect } from 'react'
import { RootStackScreenProps } from '../../types'
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  LogBox,
} from 'react-native'
import {
  TextInput,
  Button,
  Snackbar,
  Caption,
  Headline,
  Avatar,
  IconButton,
} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import moment from 'moment'
import { auth, db, storage } from '../../Firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { updateProfile } from '@firebase/auth'

const CompleteProfileScreen = ({
  navigation,
}: RootStackScreenProps<'CompleteProfile'>) => {
  LogBox.ignoreLogs(['Setting a timer'])

  const { currentUser } = auth

  const [userName, setUserName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [dob, setDOB] = useState<Date>(new Date())
  const [stringDOB, setStringDOB] = useState<string>('')
  const [profilePhoto, setProfilePhoto] = useState<string>(
    'https://picsum.photos/1000'
  )
  const [photoURL, setPhotoURL] = useState<string | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [datePickerShow, setDatePickerShow] = useState<boolean>(false)

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

  // selecting date of birth and converting to string
  const onSelectDob = (event: any, selectedDate: Date | any) => {
    const currentDate = selectedDate || dob
    setDatePickerShow(Platform.OS === 'ios')
    if (currentDate !== dob) {
      setDOB(currentDate)
      changeDateToString(currentDate)
    }
  }

  const changeDateToString = (currentDate: Date) => {
    const formatedDate = moment(currentDate).format('D MMMM YYYY')
    setStringDOB(formatedDate)
  }

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

      const storageRef = ref(storage, `${currentUser?.uid}/photos/profilePhoto`)
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

  // adding user to firestore
  const handleCreateUser = async () => {
    if (photoURL !== null) {
      if (userName !== '' && bio !== '' && stringDOB !== '') {
        try {
          if (currentUser !== null && photoURL !== null) {
            updateProfile(currentUser, {
              photoURL,
            })
          }
          const userRef = await addDoc(collection(db, 'users'), {
            displayName: currentUser?.displayName,
            userName,
            email: currentUser?.email,
            bio,
            dob,
            photoURL,
          })
          navigation.navigate('mainStack')
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      } else {
        setMessage('All fields are required')
        setShow(true)
      }
    } else {
      setMessage('Please provide a profile photo')
      setShow(true)
    }
  }

  // to close snackbar
  const handleSnackClose = () => {
    setShow(false)
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.titleContainer}>
        <Headline style={styles.title}>Complete Profile</Headline>
        <Caption style={styles.subtitle}>
          Add a profile photo, username and bio to let people know who you are
        </Caption>
      </View>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode='outlined'
          value={userName}
          label='User Name*'
          textContentType='username'
          onChange={(e) => setUserName(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label='Bio*'
          value={bio}
          onChange={(e) => setBio(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label='Date of Birth*'
          value={stringDOB}
          right={
            <TextInput.Icon
              onPress={() => setDatePickerShow(true)}
              name='calendar-blank-outline'
            />
          }
          onChange={(e) => setStringDOB(e.nativeEvent.text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode='contained'
          onPress={handleCreateUser}
          labelStyle={{ fontSize: 17, padding: 8 }}
        >
          Finish
        </Button>
      </View>
      <Snackbar
        visible={show}
        onDismiss={handleSnackClose}
        action={{
          label: 'Close',
          onPress: () => {
            handleSnackClose
          },
        }}
      >
        {message}
      </Snackbar>
      {datePickerShow && (
        <DateTimePicker
          testID='dateTimePicker'
          value={dob}
          mode='date'
          is24Hour={true}
          display='default'
          onChange={onSelectDob}
        />
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  titleContainer: {
    marginBottom: 20,
    width: '80%',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    marginTop: 12,
    borderStartColor: 'white',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#007fff',
  },
})

export default CompleteProfileScreen
