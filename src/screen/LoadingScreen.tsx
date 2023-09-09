import { View, Text, Image } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const LoadingScreen = () => {
  return (
    <View style={ styles.container }>
      <Text
      style={ styles.title }  >
        Espere unos instantes</Text>
      <ActivityIndicator
        size={180}
        color='#33CAFF'
        animating />

      <Image
        source={require('../../assets/recursos/logo.png')}
        style={ styles.imagen }
      />

    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    },

    title: {
      marginBottom: 10,
      fontSize: 25,
    },

    imagen: {
      width: 150,
      height: 150,
      top: -168
    }
});