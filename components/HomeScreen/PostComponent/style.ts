import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        padding: 12,
        paddingBottom: 0,
        paddingTop: 0,
        marginVertical: 10,
        elevation: 6,
        borderRadius: 15,
    },
    postTitle: {
        padding: 0,
    },
    postSubTitle: {
        fontSize: 16
    },
    captionView: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        
    },
    caption: {
        fontSize: 16
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        height: 350,
        zIndex: 0,
        flex: 1,
        borderRadius: 15,
    },
    actionContainer: {
        width: '100%',
        zIndex: 1,
    },
    actionInnerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    heart: {
        height: 65,
        width: 65,
        marginRight: -25,
        marginLeft: -10,
        marginTop: -10,
        marginBottom: -30,
    },
    actionInfotext: {
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
})

export default styles