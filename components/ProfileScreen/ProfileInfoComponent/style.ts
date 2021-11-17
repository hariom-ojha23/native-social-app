import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    coverPhotoContainer: {
        height: 200,
      },
      coverPhoto: {
        flex: 1,
        justifyContent: 'center',
      },
      profileInfo: {
        top: -60,
        paddingHorizontal: 15,
      },
      profilePhotoContainer: {
        padding: 3,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 60,
      },
      profileInfoContainer: {
        marginTop: 5,
        alignItems: 'center',
      },
      bio: {
        width: '60%',
        marginVertical: 10,
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
})

export default styles