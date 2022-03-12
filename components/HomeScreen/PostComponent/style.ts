import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 12,
        paddingTop: 0,
        marginVertical: 10,
        elevation: 5
    },
    contentContainer: {
        position: 'relative',
    },
    postTitle: {
        padding: 0,
    },
    postSubTitle: {
        fontSize: 16
    },
    image: {
        borderRadius: 15,
        height: 330,
        zIndex: 0
    },
    actionContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        zIndex: 1,
    },
    actionInnerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    heart: {
        height: 60,
        width: 60,
        marginRight: -25,
        marginLeft: -10,
        marginTop: -10,
        marginBottom: -30,
    },
    actionInfotext: {
        marginHorizontal: 5,
        fontWeight: 'bold',
        color: 'white'
    },
})

export default styles