import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
  },
  listItem: {
    marginVertical: 5,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  listTitle: {
    fontSize: 17,
    marginBottom: 2.5,
  },
  listDescription: {
    marginTop: 2.5,
    fontSize: 15,
  },
  itemInfoBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  badge: {
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e30b5d',
    width: 22,
    height: 22,
  },
})

export default styles
