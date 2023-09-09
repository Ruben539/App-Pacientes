import React, { useContext, useEffect } from 'react'
import { View, Text, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyle } from '../theme/LoginTheme'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { authContext } from '../context/AuthContext'


interface Props extends StackScreenProps<any, any> {};



export const LoginScreen = ({ navigation }: Props) => {

    const { singIn, errorMessage, removeError } = useContext(authContext)

    const {cedula, password, onChange } = useForm({
        cedula: '',
        password: '',
        
    })
    
    useEffect(() => {
        if(errorMessage.length === 0) return;

        Alert.alert(
            'Error de Inicio: ', errorMessage,
             [
                {
                  text: 'OK',
                  onPress: removeError
                }
             ]
             )
    }, [errorMessage])
    

    const onLogin = () => {
        console.log({cedula, password});
        Keyboard.dismiss();

        singIn({ cedula, password});
    }

    return (
        <>
            {/*Background */}
            <Background />

            <KeyboardAvoidingView 
                style={{
                    flex: 1,
                }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
                <View style={ loginStyle.formContainer}>

                    {/*Logo de la Apps */}
                    <WhiteLogo />

                    <Text style={loginStyle.title}>Inicio de Sesión</Text>

                    {/*Campos del usuario */}
                    <Text style={loginStyle.label}>Usuario :</Text>
                    <TextInput
                        keyboardType='number-pad' underlineColorAndroid='white'
                        style={[
                            loginStyle.inputField,
                            (Platform.OS === 'ios') && loginStyle.inputFieldIos
                        ]}
                        selectionColor='white'
                        onChangeText={ (value) => onChange(value, 'cedula')} 
                        value={ cedula }
                        onSubmitEditing={ onLogin }

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/*Campo de la contraseña */}
                    <Text style={loginStyle.label}>Contraseña :</Text>
                    <TextInput
                        keyboardType='number-pad' underlineColorAndroid='white'
                        style={[
                            loginStyle.inputField,
                            (Platform.OS === 'ios') && loginStyle.inputFieldIos
                        ]}
                        selectionColor='white'
                        onChangeText={ (value) => onChange(value, 'password')} 
                        value={ password }
                        onSubmitEditing={ onLogin }
                        secureTextEntry

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/**Boton de Inicio */}
                    <View style={loginStyle.botonContainer}>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={loginStyle.botonInicio}
                            onPress={ onLogin }
                        >
                            <Text style={loginStyle.botonTetx}>Ingresar</Text>
                        </TouchableOpacity>
                    </View>

                    {/**Para crear una nueva cuenta */}
                    {/* <View style={loginStyle.newUsersContainer}>
                        <TouchableOpacity activeOpacity={0.8} 
                        onPress={()=> navigation.navigate('RegisterScreen')}>
                            <Text style={loginStyle.botonTetx}>Registrar </Text>
                        </TouchableOpacity>

                    </View> */}
                </View>
            </KeyboardAvoidingView>

        </>
    )
}

