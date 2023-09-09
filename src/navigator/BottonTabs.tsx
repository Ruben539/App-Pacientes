import React from 'react';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { DashboardScreen } from '../screen/DashboardScreen';
import { PerfilScreen } from '../screen/PerfilScreen';
import { colores } from '../theme/appTheme';
import { ProfileScreen } from '../screen/ProfileScreen';


export const BottonTabs = () => {
  return Platform.OS === 'ios' ? <BottonTabsIOS /> : <BottonTabsAndroid />


}



const TabAndroid = createMaterialBottomTabNavigator();

const BottonTabsAndroid = () => {
  return (
    <TabAndroid.Navigator
      sceneAnimationEnabled={true}
      activeColor="#f0edf6"

      barStyle={{ backgroundColor: colores.primary, paddingBottom: 5 }}
      screenOptions={({ route }) => ({
        //tabBarActiveTintColor: colores.primary,
        tabBarLabelStyle: {
          fontSize: 15
        },
        tabBarIcon: ({ color, focused }) => {

          let iconName: string = '';
          switch (route.name) {
            case 'DashboardScreen':
              iconName = 'list-outline'
              break;

            case 'ProfileScreen':
              iconName = 'notifications-circle-outline'
              break;

            case 'PerfilScreen':
              iconName = 'id-card-outline'
              break;

          }
          return <Icon name={iconName} size={25} />
        }
      })}

    >
      <TabAndroid.Screen name="DashboardScreen" options={{ title: 'Lista de Estudios' }} component={DashboardScreen} />
      <TabAndroid.Screen name="ProfileScreen" options={{ title: 'Promociones' }} component={ProfileScreen} />
      <TabAndroid.Screen name="PerfilScreen" options={{ title: 'Perfil del Usuario' }} component={PerfilScreen} />
      
    </TabAndroid.Navigator>
  );
}


const TabIos = createBottomTabNavigator();

const BottonTabsIOS = () => {
  return (
    <TabIos.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}

      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colores.primary,
        tabBarStyle: {

          borderTopWidth: 0,
          elevation: 0
        },
        tabBarLabelStyle: {
          fontSize: 15
        },
        tabBarIcon: (props) => {

          let iconName: string = '';
          switch (route.name) {
            case 'DashboardScreen':
              iconName = 'list-outline'
              break;

            case 'ProfileScreen':
              iconName = 'notifications-circle-outline'
              break;

            case 'PerfilScreen':
              iconName = 'id-card-outline'
              break;


          }
          return <Icon name={iconName} size={20} color={colores.primary} />
        }
      })}

    >
      <TabIos.Screen name="DashboardScreen" options={{ title: 'Lista de Estudios' }} component={DashboardScreen} />
      <TabIos.Screen name="ProfileScreen" options={{ title: 'Perfil del Usuario' }} component={ProfileScreen} />
      <TabIos.Screen name="PerfilScreen" options={{ title: 'Perfil del Usuario' }} component={PerfilScreen} />
    </TabIos.Navigator>
  );
}