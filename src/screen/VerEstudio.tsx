import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, useWindowDimensions, Modal,Share } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import pacientesApi from '../api/pacientesApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Icon, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';



export const VerEstudio = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const [isLoading, setisLoading] = useState(false);
    const [archivosEstudio, setArchivosEstudio] = useState([])
    const [pdfUrlSelected, setPdfUrlSelected] = useState("")
    const [downloadFileProgress, setDownloadFileProgress] = useState(false)
    const [optionsModalEstudioPreview, setOptionsModalEstudioPreview] = useState({
        show: false,
        index: 0
    })

    const getAllArchivoEsstudios = async () => {
        setisLoading(true);
        const { detalleOrdenId, ordenId } = route.params;
        const resp = await pacientesApi.get(`/paciente/ordenes/${ordenId}/detalle/${detalleOrdenId}/archivos`);
        console.log(resp.data.data);
        setArchivosEstudio(resp.data.data);
    }

    const listaArchivosEstudios = () => {
        const NewArchivo = archivosEstudio.map(({ nombre, url }) => {
            const urlData = url;
            const nameData = nombre;

            return { urlData, nameData };

        })
    }

    const showModalEstudioPreview = function (index: any) {
        setOptionsModalEstudioPreview({
            ...optionsModalEstudioPreview,
            show: true,
            index: index
        })
    }

    const closeModalEstudioPreview = function () {
        setOptionsModalEstudioPreview({
            ...optionsModalEstudioPreview,
            show: false,
        })
    }

    const contextMenuFooterPreviewEstudio = { 
        cancel: 'Cancelar',
        send:   'Enviar' 
    }

    const OnShare = () => {
        let link = 'Usuario'
        let message = 'Hola desde la app de la aplicacion.'
    }


    const renderFooterPreviewEstudio = ({ send,cancel }: any) => {
        return (
            <View style={styles.bottomContainer}>
                <ListItem onPress={cancel}>
                    <ListItem.Content>
                        <ListItem.Title>Cancelar</ListItem.Title>
                    </ListItem.Content>
                    <Icon type="ionicon" name="close-circle-outline"/>
                </ListItem>
                <ListItem onPress={send}>
                    <ListItem.Content>
                        <ListItem.Title>Cancelar</ListItem.Title>
                    </ListItem.Content>
                    <Icon type="ionicon" name="close-circle-outline"/>
                </ListItem>
            </View>
        )
    }



    useEffect(() => {
        setisLoading(false);
        console.log('Buscando el URL');
        getAllArchivoEsstudios();
        listaArchivosEstudios();
    }, [])

    return (
        <SafeAreaView style={ styles.container }
        >
            <ScrollView>
           <View style={ styles.containerTitle }>
           <Text style={ styles.title }>Estudio</Text>
           </View>
                <View>
                   
                    {
                        archivosEstudio.map(({ url, extension }, item) => {

                            return (
                                <>
                                <TouchableOpacity onPress={()=>showModalEstudioPreview(item)}
                                key={item}
                                >
                                      <Image    source={{ uri: url }} style={styles.imagen}  />
                                </TouchableOpacity>
                              
                                
                                </>
                            );

                        })
                    }
                    <Modal onRequestClose={()=>closeModalEstudioPreview()} visible={optionsModalEstudioPreview.show} transparent={true}>
                    <ImageViewer footerContainerStyle={{width:'100%'}}menus={renderFooterPreviewEstudio} menuContext={contextMenuFooterPreviewEstudio} onCancel={()=>closeModalEstudioPreview()} enableSwipeDown={true} index={optionsModalEstudioPreview.index} imageUrls={archivosEstudio}/>
                     </Modal>
                  
                </View>
                
            </ScrollView>
            <View style={{
                flex: 1,
            }}></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 10,
    },

    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,

    },

    title: {
        fontSize: 25,
    },

    

   

    imagen: {
        width: null,
        height: 300,
        flex: 1,
        resizeMode: 'stretch',
        marginTop: 20
    },

    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

})
