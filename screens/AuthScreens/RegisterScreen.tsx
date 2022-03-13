import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { TextInput, Button, Snackbar } from 'react-native-paper'
import { Text } from '../../components/Themed'
import { useKeyboard } from '../../hooks/useKeyboard'
import { RootStackScreenProps } from '../../types'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../Firebase/config'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'

const RegisterScreen = ({ navigation }: RootStackScreenProps<'Register'>) => {
  const [displayName, setDisplayName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  const isKeyBoardOpen = useKeyboard()
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const isValid = (enteredEmail: string) => {
    return emailRegex.test(enteredEmail)
  }

  const handleRegister = async () => {
    if (isValid(email)) {
      if (displayName !== '' && password !== '') {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const { user } = userCredential
            updateProfile(user, {
              displayName,
            })
            if (user) {
              navigation.navigate('CompleteProfile')
            }
          })
          .catch((error) => {
            setMessage(error)
            setShow(true)
          })
      } else {
        setMessage('All fields are required.')
        setShow(true)
      }
    } else {
      setMessage('Invalid Email! Please enter a valid email.')
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
            <Text style={styles.title}>Hello There!</Text>
            <Text style={styles.subtitle}>
              Register yourself to get started
            </Text>
          </>
        )}
      </View>
      <View style={(styles.upperView, { backgroundColor: colors.background })}>
        <Text style={styles.login}>Register</Text>
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
            label='Email Address'
            textContentType='emailAddress'
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            left={<TextInput.Icon name='email' color='gray' />}
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
            style={styles.registerButton}
            mode='contained'
            onPress={handleRegister}
            labelStyle={{ fontSize: 17, padding: 10 }}
          >
            Register
          </Button>
        </View>
        <View>
          <TouchableOpacity
            style={styles.loginLinkContainer}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginLink}>Already have an account? </Text>
            <Text style={styles.loginLink}>Sign In</Text>
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
  registerButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#007fff',
  },
  loginLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    fontSize: 17,
  },
})

export default RegisterScreen
