import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  TextInput,
  Button,
  Divider,
  Portal,
  Dialog,
  Paragraph,
  Title,
} from 'react-native-paper'
import { Text } from '../../components/Themed'
import { RootStackScreenProps } from '../../types'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase/config'

const RegisterScreen = ({ navigation }: RootStackScreenProps<'Register'>) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const isValid = (email: string) => {
    return emailRegex.test(email)
  }

  const handleRegister = () => {
    if (isValid(email)) {
      if (name !== '' && password !== '') {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            if (user) {
              navigation.navigate('Login')
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
      setMessage('Your email address is not valid. Please enter a valid email.')
      setShow(true)
    }
  }

  const handleAlertClose = () => {
    setShow(false)
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello There!</Text>
        <Text style={styles.subtitle}>Register yourself to get started</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode='outlined'
          value={name}
          placeholder='Full Name*'
          textContentType='name'
          onChange={(e) => setName(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          placeholder='Email Address*'
          textContentType='emailAddress'
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.input}
          textContentType='password'
          mode='outlined'
          secureTextEntry
          placeholder='Password*'
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.loginButton}
          mode='contained'
          onPress={handleRegister}
          labelStyle={{ fontSize: 17, padding: 10 }}
        >
          Register
        </Button>
      </View>
      <Divider />
      <View style={styles.registerLinkContainer}>
        <Text style={styles.registerLink}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={show} onDismiss={handleAlertClose}>
          <Title style={styles.dialogTitle}>Invalid Credentials!</Title>
          <Dialog.Content>
            <Paragraph>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleAlertClose}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    borderStartColor: 'white',
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
  dialogTitle: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
})

export default RegisterScreen
