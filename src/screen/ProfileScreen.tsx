import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useMotionValue, useTransform, motion } from "framer-motion";


export const ProfileScreen = () => {

  // const x = useMotionValue(1);
  // const y = useMotionValue(0);

  // const rotateX = useTransform(y, [-100, 100], [30, -30]);
  // const rotateY = useTransform(y, [100, -100], [-30, 30]);
  return (
    
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.cardImage}>
              <Image style={styles.image}
                source={require('../../assets/recursos/logo.png')} />
            </View>
            <Text style={ styles.cardText}>Promociones</Text>
            <View>
               
              </View>
            <View style={ styles.containerImagenLateral }>
              
              <Image style={styles.imageLateral}
                source={require('../assets/diente2.png')}
              />
            </View>
          </View>
        </View>
    
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  card: {
    width: 360,
    height: 550,
    backgroundColor: '#DFDFDF  ',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 1,
    top: 20,

  },

  cardImage: {
    position: 'absolute',
    height: 120,
    width: 120,
    backgroundColor: 'white',
    borderRadius: 100,
    marginTop: -80,
    marginLeft: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 5,
  },

  image: {
    position: 'absolute',
    width: 100,
    height: 100,
    marginTop: -13,
    marginLeft: 5,

  },

  cardText: {
    fontSize: 30,
    top: 40,
    left: 90,
    alignItems: "center",
  },

  imageFlayer: {
    position: "absolute",
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: "center",
    marginLeft: 30,
    marginTop: 50,
  },

  containerImagenLateral: {
    position: 'absolute',
    width: 150,
    height: 150,
    marginTop: 450,
    marginLeft: 250,

  },

  imageLateral: {
    position: 'absolute',
    width: 150,
    height: 150,
  }
});