import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { authContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';



export const PerfilScreen = () => {

  const { user, logOut } = useContext(authContext)
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<string>();

  const UserValitation = (datos: string | undefined | number) => {
    if (datos === undefined) {
      return 'No existe un Usuario Logueado';
    } else {
      return datos;
    }
  }

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      console.log('Terminating');
      setRefreshing(false);
     
    }, 1000);

  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'white' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={20}
          colors={['#33CAFF', '#22CAFF']}
        />
      }
    >
      <View style={styles.container}>
          {
            (user?.sexo === 'masculino') ?(
        <View style={styles.containerImage}>
            <Image
            source={require('../assets/usuarios/avatar-man.png')}
            style={styles.image}
          /> 
        </View>

            ) : (
              <View style={styles.containerImage}>
              <Image
              source={require('../assets/usuarios/avatar-girl.png')}
              style={styles.image}
            /> 
          </View>
            )
           }

        <View style={styles.containerInfo}>
        <Text style={styles.title}>Bienvenido:</Text>
          <View style={ styles.containerSubInfo}>
            <Text style={styles.subTitle}>Paciente: {UserValitation(user?.name)}</Text>
            <Text style={styles.subTitle}>Nro Cedula: {UserValitation(user?.cedula)}</Text>
            <Text style={styles.subTitle}>F. Nacimiento: {UserValitation(user?.fecha_nacimiento)}</Text>
            <Text style={styles.subTitle}>Sexo: {UserValitation(user?.sexo)}</Text>
            <Text style={styles.subTitle}>Edad: {UserValitation(user?.edad)}</Text>
          </View>
        </View>



        <TouchableOpacity
          onPress={logOut}
          style={styles.botonSalir}>
          <Text style={styles.botonText}>Cerrar Sesión</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',

  },

  containerImage: {
    height: 200,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 100,
    marginTop: 15,
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

  image: {
    width: 180,
    height: 160,
    marginTop: -13,
    marginLeft: 5,

  },


  containerInfo: {
    height: 360,
    width: 380,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 10,
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

  containerSubInfo:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  title: {
    fontSize: 30,
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 25,
  },

  botonSalir: {
    backgroundColor: '#33CAFF',
    width: 150,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 10,
  },

  botonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

