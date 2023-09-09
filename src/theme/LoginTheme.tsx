import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,

    },

    title: {
        color: 'white',
        fontSize: 30,
        marginTop: 10,
        textAlign: 'center'

    },

    label: {
        fontSize: 20,
        marginTop: 15,
        marginLeft: 10,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
    },

    inputField: {
        color: 'white',
        fontSize: 18,
    },

    inputFieldIos: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingBottom: 4,
    },

    botonContainer: {
        alignItems: 'center',
        marginTop: 25,
    },

    botonInicio: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 100
    },

    botonTetx: {
        color: 'white',
        fontSize: 18,
        fontWeight: '900',

    },

    newUsersContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
        marginRight: 10,

    },

    bottonReturn: {
     position: 'absolute',
     top: 40,
     left: 20,
     borderWidth: 2,
     borderColor: '#33CAFF',
     paddingHorizontal: 10,
     paddingVertical: 5,
     borderRadius: 100,
     alignItems: 'center',

    },

    bottonReturnTetx: {
        color: '#33CAFF',
        fontSize: 16,
        
    }

});