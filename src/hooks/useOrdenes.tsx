import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useOrdenes = () => {

    const getToken = async() =>{
        const token = await AsyncStorage.getItem('token');
        return token;
    }
  return (
    getToken()
  )
}

