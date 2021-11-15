import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput, Button, Divider, Snackbar } from 'react-native-paper'
import { Text } from '../../components/Themed'
import { RootStackScreenProps } from '../../types'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase/config'

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const isValid = (email: string) => {
    return emailRegex.test(email)
  }

  const handleSignIn = async () => {
    if (isValid(email)) {
      if (password !== '') {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
            if (user) {
              navigation.replace('mainStack')
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
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello Again!</Text>
        <Text style={styles.subtitle}>Welcome back you've been missed</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode='outlined'
          label='Email Address*'
          textContentType='emailAddress'
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.input}
          textContentType='password'
          mode='outlined'
          secureTextEntry
          label='Password*'
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.loginButton}
          mode='contained'
          onPress={handleSignIn}
          labelStyle={{ fontSize: 17, padding: 10 }}
        >
          Sign In
        </Button>
      </View>
      <Divider />
      <View style={styles.registerLinkContainer}>
        <Text style={styles.registerLink}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register now</Text>
        </TouchableOpacity>
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
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 20,
    width: '65%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 10,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    marginTop: 12,
  },
  buttonContainer: {
    width: '80%',
  },
  loginButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#007fff',
  },
  registerLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  registerLink: {
    fontSize: 17,
  },
})

export default LoginScreen
