import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screen/LoginScreen';
import { RegisterScreen } from '../screen/RegisterScreen';
import { ProtectedScreen } from '../screen/ProtectedScreen';
import { useContext } from 'react';
import { useWindowDimensions } from 'react-native';
import { authContext } from '../context/AuthContext';
import LoadingScreen from '../screen/LoadingScreen';
import { DashboardScreen } from '../screen/DashboardScreen';
import { BottonTabs } from './BottonTabs';
import { DetalleEstudios } from '../screen/DetalleEstudios';
import { VerEstudio } from '../screen/VerEstudio';




const Stack = createStackNavigator();

export const Navigation = () => {

  const { status } = useContext(authContext);

  if( status === 'checking') return <LoadingScreen/>
  //if( status === 'checking') return <DashboardScreen/>

  return (
    

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerLeftContainerStyle:{
          backgroundColor: 'white',
          elevation: 0.5
        },
        cardStyle: {
          backgroundColor: 'white',
          elevation: 1.5,
        }
      }}
      >
      {
        (status !== 'authenticated') ? (
          <>
            <Stack.Screen name="LoginScreen" options={{ title: ''}} component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ): (
          <>
           <Stack.Screen name="ProtectedScreen" options={{title:''}}  component={ProtectedScreen} />
           <Stack.Screen name="DashboardScreen" component={DashboardScreen} /> 
           <Stack.Screen name="DetalleEstudios" options={{ title:'Detalle del Estudio' }} component={DetalleEstudios} /> 
           <Stack.Screen name="VerEstudio"  options={{title:'Imagen del Estudio'}} component={VerEstudio} /> 
           <Stack.Screen name="BottonTabs" options={{title:'Lista de Estudios'}} component={BottonTabs} /> 
          
          </>
         
                    
        )
        
      }

    </Stack.Navigator>
  )
}

