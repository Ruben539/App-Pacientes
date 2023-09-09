import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList, ActivityIndicator } from 'react-native'
import { Card, ListItem, Header, Badge, Icon } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native'
import pacientesApi from '../api/pacientesApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const DetalleEstudios = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [estudioDetalleOrden, setEstudioDetalleOrden] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getAllEstudiosPaciente = async () => {
        const { ordenId } = route.params
        const resp = await pacientesApi.get(`/paciente/ordenes/${ordenId}/detalle`);
        setRefreshing(false);
        setEstudioDetalleOrden(resp.data.data);
        //console.log(resp.data.data);
    }

    const refreshDetalleOrden = () => {
        setRefreshing(true)
        setEstudioDetalleOrden([])
        getAllEstudiosPaciente()
    }

    useEffect(() => {
        getAllEstudiosPaciente();
    }, [])

    return (
        <SafeAreaView>
            <View>
            <View style={ styles.containerTitle }>
            <Text style={ styles.title}>Estudios Realizados</Text>
           </View>
                <Card>
                    <Card.Divider />
                    <FlatList
                        refreshing={refreshing}
                        onRefresh={() => refreshDetalleOrden()}
                        data={estudioDetalleOrden}
                        renderItem={({ item }) => <ItemList estudio={item} />}
                        ListFooterComponent={<FooterList isLoading={refreshing} />}
                        keyExtractor={(item) => item.id}
                    />
                </Card>

            </View>
        </SafeAreaView>



    )
}

function ItemList(props: any) {
    const { estudio } = props
    const navigator = useNavigation()
    const route = useRoute()
    let routeSelected = estudio.tipo_estudio.includes('Modelo') ? 'ListadoArchivo' : 'VerEstudio'
    return (
        <ListItem key={estudio.id}  bottomDivider onPress={()=>navigator.navigate(routeSelected,{detalleOrdenId:estudio.id,ordenId:route.params.ordenId})}>
            <ListItem.Content>
                <ListItem.Title>{estudio.estudio}</ListItem.Title>
                <ListItem.Subtitle>{estudio.tipo_estudio}</ListItem.Subtitle>
            </ListItem.Content>
            <Badge value={estudio.archivos} status="primary" />
            <Icon name="eye-outline" type="ionicon" />
        </ListItem>
    )
}

function FooterList(props: any) {
    const { isLoading } = props
    return (
        <View style={{ marginTop: 15 }}>
            {
                isLoading
                    ? <ActivityIndicator size="large" color="blue" />
                    : <Text style={{ textAlign: 'center' }}>No hay mas estudios</Text>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    containerTitle:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
       
    },

    title: {
        fontSize: 25,
    }
});