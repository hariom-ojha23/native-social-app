import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue'
    },
    commentHeader: {
        padding: 10,
        elevation: 2
    },
    commentBox: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',

    },
    avatarPart: {
        width: '17%',
        display: 'flex',
        alignItems: 'center'
    },
    commentPart: {
        width: '68%'
    },
    timePart: {
        width: '15%',
        display: 'flex',
        alignItems: 'center'
    },
    inputBox: {
        paddingVertical: 8,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        width: '68%',
    },
    sendButton: {
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        height: 50,

    }
})

export default styles