import { Dimensions, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, Animated, View, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useAnimation } from '../hooks/useAnimation';
import { StackScreenProps } from '@react-navigation/stack';


const { width: screenWidth } = Dimensions.get('window');

interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType
}

const items: Slide[] = [
  {
    title: 'Arco siempre cerca Tuyo..',
    desc: 'Contamos con varias sucursales, por todo el pais para brindarte una mejor atención.',
    img: require('../assets/carrusell/slide-1.png')
  },
  {
    title: 'Tus estudios al Instante...',
    desc: 'Una vez realizado tus estudios, tienes la facilidad de verlos al instante, en cualquier lugar desde la app de pacientes sin necesidad de registro y solamente con tu nro de cedula.',
    img: require('../assets/carrusell/slide-2.png')
  },
  {
    title: 'Convenios con Odontologias...',
    desc: 'Contamos con convenios con varias odontologias para ofrecerte el mejor precio para realizarte tus estudios en todas nuestras sucursales.',
    img: require('../assets/carrusell/slide-3.png')
  },
]

interface Props extends StackScreenProps<any, any> { };

export const ProtectedScreen = ({ navigation }: Props) => {

  const [ativeIndex, setActiveIndex] = useState(0);
  const { opacity, fadeIn } = useAnimation();
  // const [isVisible, setVisible] = useState(false);
  const isVisible = useRef(false);

  const renderItem = (item: Slide) => {
    return (
      <View style={styles.viewItm}>
        <Image
          source={item.img}
          style={styles.imgItem}
        />
        <Text style={styles.titleItem}>{item.title}</Text>
        <Text style={styles.subTitleItem}>{item.desc}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        //ref={(c) => { this._carousel = c; }}
        data={items}
        renderItem={({ item }: any) => renderItem(item)}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout={'default'}
        onSnapToItem={(index) => {
          setActiveIndex(index);
          if (index === 2) {
            isVisible.current = true;
            fadeIn();
          } else {
            isVisible.current = false;

          }
        }}
      />

      <View style={styles.pagination}>
        <Pagination
          dotsLength={items.length}
          activeDotIndex={ativeIndex}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#5856D6',
           
          }}
        />


        <Animated.View style={{ opacity }}>
          <TouchableOpacity style={styles.bottomSiguiente}
            activeOpacity={0.9}
            onPress={() => {
              if (isVisible.current) {
                //LLamar a la instruccion de navegacion
                navigation.navigate('BottonTabs')
              }
            }}>
            <Text style={styles.textBotton}>Entrar</Text>
          </TouchableOpacity>
        </Animated.View>



      </View>

    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10

  },

  viewItm: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 30,
    justifyContent: 'center',
    
  },

  imgItem: {
    width: 350,
    height: 400,
    resizeMode: 'center',
    
  },

  titleItem: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5856D6',
  },

  subTitleItem: {
    fontSize: 20
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
  },

  bottomSiguiente: {
    flexDirection: 'row',
    backgroundColor: '#5856D6',
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  textBotton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});