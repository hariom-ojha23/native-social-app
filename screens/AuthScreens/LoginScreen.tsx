import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { TextInput, Button, Snackbar } from 'react-native-paper'
import { Text } from '../../components/Themed'
import { useKeyboard } from '../../hooks/useKeyboard'
import { RootStackScreenProps } from '../../types'
import { signInWithEmailAndPassword } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../../Firebase/config'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const isValid = (enteredEmail: string) => {
    return emailRegex.test(enteredEmail)
  }

  const isKeyBoardOpen = useKeyboard()

  const handleSignIn = async () => {
    if (isValid(email)) {
      if (password !== '') {
        await signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user
            console.log(user)
            if (user) {
              try {
                await AsyncStorage.setItem('uid', user.uid)
                  .then(() => navigation.replace('MainStack'))
                  .catch((error) => console.log(error))
              } catch (e) {
                console.log(e)
              }
            }
          })
          .catch((error) => {
            const errMessage = error.code.split('/')[1]
            setMessage(errMessage)
            setShow(true)
          })
      } else {
        setMessage('All fields are required.')
        setShow(true)
      }
    } else {
      setMessage('Email Invalid! Please enter a valid email.')
      setShow(true)
    }
  }

  const handleSnackClose = () => {
    setShow(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.bottomView}>
        {!isKeyBoardOpen && (
          <>
            <Text style={styles.title}>Hello Again!</Text>
            <Text style={styles.subtitle}>
              We missed you! Login to get started
            </Text>
          </>
        )}
      </View>
      <View style={[styles.upperView, { backgroundColor: colors.background }]}>
        <Text style={styles.login}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode='outlined'
            label='Email Address'
            textContentType='emailAddress'
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            left={<TextInput.Icon name='account' color='gray' />}
          />
          <TextInput
            style={styles.input}
            textContentType='password'
            mode='outlined'
            secureTextEntry
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            left={<TextInput.Icon name='lock' color='gray' />}
          />
          <Button
            style={styles.loginButton}
            mode='contained'
            onPress={handleSignIn}
            labelStyle={{ fontSize: 17, padding: 10 }}
          >
            Sign In
          </Button>
        </View>
        <View>
          <TouchableOpacity
            style={styles.registerLinkContainer}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerLink}>Don't have an account? </Text>
            <Text style={styles.registerLink}>Register now</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    position: 'relative',
  },
  bottomView: {
    backgroundColor: '#007fff',
    width: '100%',
    justifyContent: 'center',
    height: '35%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  upperView: {
    zIndex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '75%',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginHorizontal: 25,
    color: 'white',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
    marginHorizontal: 25,
    color: 'white',
    letterSpacing: 0.5,
  },
  login: {
    marginHorizontal: 25,
    marginVertical: 30,
    fontSize: 23,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  inputContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    marginTop: 12,
  },
  loginButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#007fff',
  },
  registerLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  registerLink: {
    fontSize: 17,
  },
})

export default LoginScreen
