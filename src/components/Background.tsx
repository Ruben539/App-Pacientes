import { View, Text } from 'react-native'
import React from 'react'

export const Background = () => {
  return (
    <View style={{
        position: 'absolute',
        backgroundColor: '#33CAFF',
        top: -200,
        width: 1200,
        height: 1000,
        transform: [
          {rotate: '-50deg'}
        ],
    }}>
    
    </View>
  )
}

