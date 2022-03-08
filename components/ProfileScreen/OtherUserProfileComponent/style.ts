import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  coverPhotoContainer: {
    height: 240,
  },
  coverPhoto: {
    flex: 1,
    justifyContent: 'center',
  },
  profileInfo: {
    paddingHorizontal: 15,
  },
  profilePhotoContainer: {
    padding: 3,
    alignSelf: 'center',
    position: 'absolute',
    top: -80,
    borderRadius: 73,
  },
  profileInfoContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  displayName: {
    fontSize: 24
  },
  userName: {
    fontSize: 17,
    marginVertical: 5
  },
  bio: {
    width: '60%',
    marginVertical: 7,
    fontSize: 17,
    textAlign: 'center',
  },
  gridView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  gridItem: {
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 24
  },
  horizontalDivider: {
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  gridText: {
    textAlign: 'center',
    fontSize: 14,
  },
  gridNumber: {
    textAlign: 'center',
    fontSize: 19,
  },
  followButton: {
    width: '80%',
    backgroundColor: '#007fff',
  },
  followBtnLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    padding: 5,
  },
  toggleButtonContainer: {
    width: '80%',
    justifyContent: 'center',
    paddingVertical: 15
  },
})

export default styles