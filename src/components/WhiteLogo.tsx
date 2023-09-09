import { View, Image, StyleSheet } from 'react-native'
import React from 'react'


export const WhiteLogo = () => {
  return (
    <View style={ styles.container }>
      <Image
        source={require('../../assets/recursos/logo.png')}
        style={styles.imagen}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: 170,
    backgroundColor: 'white',
    marginLeft: 90,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 10,
  },

  imagen: {
    width: 150,
    height: 150,
  }
});
