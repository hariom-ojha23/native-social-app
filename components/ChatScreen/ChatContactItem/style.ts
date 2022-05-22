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
    fontSize: 16,
    marginBottom: 1,
  },
  listDescription: {
    marginTop: 1,
    fontSize: 14,
  },
  itemInfoBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
