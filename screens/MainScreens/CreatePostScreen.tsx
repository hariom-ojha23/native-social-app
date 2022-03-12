import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootStackScreenProps } from '../../types'
import { View, Text } from '../../components/Themed'
import {
  Appbar,
  Subheading,
  FAB,
  Surface,
  TextInput,
  Snackbar,
} from 'react-native-paper'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import { db, storage } from '../../Firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

type Props = RootStackScreenProps<'MainStack'>

const CreatePostScreen = ({ navigation }: Props) => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]
  const maxDescLen = 250

  const [remdescLength, setRemDescLength] = useState(0)
  const [description, setDescription] = useState<string>('')
  const [rawImageArr, setRawImgArr] = useState<Array<string>>([])
  const [imageArr, setImageArr] = useState<Array<string>>([])
  const [authorInfo, setAuthorInfo] = useState({
    uid: '',
    displayName: '',
    userName: '',
    profilePhotoUrl: '',
  })
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const getPermission = async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    }

    const getUserData = async () => {
      AsyncStorage.getItem('userData')
        .then((res) => {
          if (res !== null) {
            const data = JSON.parse(res)
            setAuthorInfo(data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    getUserData()
    getPermission()
  }, [])

  // change description value and counter length
  const changeDescription = (value: string) => {
    if (value.length <= maxDescLen) {
      setDescription(value)
      setRemDescLength(maxDescLen - value.length)
    }
  }

  // handle snackbar closing
  const handleSnackClose = () => {
    setShow(false)
  }

  // remove raw images
  const removeImage = (uri: string) => {
    const tempArr = rawImageArr.filter((x) => x !== uri)
    setRawImgArr(tempArr)
  }

  // function to pick images from local storage
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      videoQuality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setRawImgArr([...rawImageArr, result.uri])
    }
  }

  // upload photos to firebase storage
  const uploadPhotoToStorage = async (uri: string) => {
    return new Promise<void>(async (resolve) => {
      try {
        const response = await fetch(uri)
        const imageBlob = await response.blob()

        const storageRef = ref(
          storage,
          `user/${authorInfo.uid}/posts/${uuid.v4()}`
        )
        const uploadTask = uploadBytesResumable(storageRef, imageBlob)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress.toFixed(2) + '% done')
          },
          (error) => {
            const errMessage = error.code.split('/')[1]
            setMessage(errMessage)
            setShow(true)
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const temp = imageArr
              temp.push(downloadURL)
              setImageArr(temp)
              resolve()
            })
          }
        )
      } catch (error) {
        console.log(error)
      }
    })
  }

  const uploadAll = async () => {
    for (let uri of rawImageArr) {
      await uploadPhotoToStorage(uri)
    }
  }

  // function to create posts
  const createPost = async () => {
    if (description.length === 0 && rawImageArr.length === 0) {
      setMessage('Either create a description or select atleast one image')
      setShow(true)
    } else {
      uploadAll()
        .then(async () => {
          const docData = {
            author: {
              uid: authorInfo.uid,
              displayName: authorInfo.displayName,
              userName: authorInfo.userName,
              profilePhotoUrl: authorInfo.profilePhotoUrl,
            },
            comments: [],
            images: imageArr,
            description: description,
            likes: [],
            createdAt: new Date().getTime(),
          }

          await addDoc(collection(db, 'posts'), docData)
            .then(() => {
              setImageArr([])
              setDescription('')
              setRawImgArr([])
              setRemDescLength(maxDescLen)
              setMessage('post created successfully')
              setShow(true)
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 75 }}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.Content title='Create New Post' />
        <Appbar.Action
          icon='check'
          style={{ marginRight: 20 }}
          onPress={() => createPost()}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Surface style={styles.descriptionSurface}>
          <Subheading style={{ fontWeight: 'bold' }}>Description</Subheading>
          <TextInput
            mode='outlined'
            placeholder='Say something about your post...'
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(val) => changeDescription(val)}
          />
          <Text style={{ alignSelf: 'flex-end', paddingTop: 10 }}>
            {`${remdescLength} / ${maxDescLen}`}
          </Text>
        </Surface>
        <Surface style={styles.imagesWrapper}>
          {rawImageArr.map((x, index) => (
            <View style={{ position: 'relative', borderRadius: 10, margin: 8 }}>
              <Image
                key={index}
                source={{ uri: x }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
              <View style={styles.closeWrapper}>
                <Ionicons
                  name='close'
                  color={colors.text}
                  size={20}
                  onPress={() => removeImage(x)}
                />
              </View>
            </View>
          ))}
        </Surface>
      </ScrollView>
      <FAB style={styles.fab} icon='camera' onPress={() => pickImage()} />
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 75,
  },
  descriptionSurface: {
    elevation: 5,
    padding: 12,
    margin: 15,
    borderRadius: 10,
  },
  photoSurface: {
    elevation: 5,
    padding: 12,
    margin: 15,
    borderRadius: 10,
    height: 400,
  },
  coverPhoto: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#007fff',
  },
  imagesWrapper: {
    margin: 15,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderRadius: 10,
    elevation: 5,
  },
  closeWrapper: {
    position: 'absolute',
    right: -6,
    top: -6,
    borderRadius: 50,
    elevation: 5,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CreatePostScreen
