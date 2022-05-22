import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fabBtn: {
    width: '12%',
    height: 47,
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'purple',
    borderRadius: 25,
  },
  inputBox: {
    backgroundColor: '#f2f2f2',
    width: '88%',
    minHeight: 50,
    maxHeight: 80,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    paddingVertical: 0.5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  sendBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#007bff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
})

export default styles
