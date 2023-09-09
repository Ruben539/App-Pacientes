import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'
import { ListItem, Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import pacientesApi from '../api/pacientesApi';


export const DashboardScreen = () => {

  const navigator = useNavigation();
  const [ordenesPacientes, setOrdenesPacientes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);




  const getAllOrdenesPacientes = async () => {
    try {


      const resp = await pacientesApi.get('/paciente/ordenes');
      const ordenes = resp.data.data;
      setOrdenesPacientes(ordenes);
      setRefreshing(false);

      console.log(ordenesPacientes);
    } catch (error: any) {
      setRefreshing(false);
      console.error(error.resp);
    }
  }


  const refreshListadoOrdenes = () => {
    setRefreshing(true)
    setOrdenesPacientes([])
    getAllOrdenesPacientes()
  }

  useEffect(() => {
    getAllOrdenesPacientes();
  }, [])


  return (

    <ScrollView style={{
      flex: 1,
      backgroundColor: 'white'
    }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshListadoOrdenes}
          progressViewOffset={20}
          colors={['#33CAFF', '#22CAFF']}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.contarinerEstudios}>
          <View style={ styles.containerTitle}>
           
               <Text style={styles.title}>Lista de Estudios</Text>
          </View>
         
          <Card.Divider />
          {
            ordenesPacientes.map((orden: any) => {
              return (
                <ListItem key={orden.id} bottomDivider onPress={() => navigator.navigate('DetalleEstudios',{ordenId:orden.id})}>
                  <Icon name="receipt-outline" type="ionicon" />
                  
                  <ListItem.Content>
                    <ListItem.Title>{orden.fecha}</ListItem.Title>
                    <ListItem.Subtitle>{orden.sucursal}</ListItem.Subtitle>
                    <ListItem.Subtitle>{orden.razon_social}</ListItem.Subtitle>
                    <ListItem.Subtitle>{orden.ruc}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon name="arrow-redo-outline" type="ionicon" />
                </ListItem>
              )
            })
          }
          {
            ordenesPacientes.length == 0 && (
              <ActivityIndicator size="large" color="blue" />
            )
          }
        </View>
      </View>
      <Text></Text>
    </ScrollView>



  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'white',

  },

  contarinerEstudios: {
    height: 700,
    width: 380,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 10,
  },

  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
   
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',

  }

});

