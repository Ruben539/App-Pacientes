import React from 'react'
import { View, Text, TextInput, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'

import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyle } from '../theme/LoginTheme'
import { useForm } from '../hooks/useForm'
import { Background } from '../components/Background'


interface Props extends StackScreenProps<any, any> { };

export const RegisterScreen = ({ navigation }: Props) => {


  const { nombre, password, onChange } = useForm({
    nombre: '',
    password: '',

  })

  const onRegister = () => {
    console.log({ nombre, password });
    Keyboard.dismiss();
  }

  return (
    <>

    <Background />
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={loginStyle.formContainer}>

          {/*Logo de la Apps */}
          <WhiteLogo />

          <Text style={loginStyle.title}>Registro de Usuario</Text>

          {/*Campos del usuario */}
          <Text style={loginStyle.label}>Nombre :</Text>
          <TextInput
            underlineColorAndroid='white'
            style={[
              loginStyle.inputField,
              (Platform.OS === 'ios') && loginStyle.inputFieldIos
            ]}
            selectionColor='white'
            onChangeText={(value) => onChange(value, 'nombre')}
            value={nombre}
            onSubmitEditing={onRegister}

            autoCapitalize='words'
            autoCorrect={false}
          />

          {/*Campo de la contraseña */}
          <Text style={loginStyle.label}>Cedula :</Text>
          <TextInput
            keyboardType='number-pad' underlineColorAndroid='white'
            style={[
              loginStyle.inputField,
              (Platform.OS === 'ios') && loginStyle.inputFieldIos
            ]}
            selectionColor='white'
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onRegister}
            secureTextEntry

            autoCapitalize='none'
            autoCorrect={false}
          />

          {/**Boton de Inicio */}
          <View style={loginStyle.botonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyle.botonInicio}
              onPress={onRegister}
            >
              <Text style={loginStyle.botonTetx}>Registrar</Text>
            </TouchableOpacity>
          </View>

          {/**Para regresar al inicio */}
          <View style={ loginStyle.bottonReturn }>
            <TouchableOpacity activeOpacity={0.8} 
              onPress={()=> navigation.navigate('LoginScreen')}>
              <Text style={loginStyle.bottonReturnTetx}>Inicio </Text>
            </TouchableOpacity>

          </View>

        </View>
      </KeyboardAvoidingView>

    </>
  )
}
