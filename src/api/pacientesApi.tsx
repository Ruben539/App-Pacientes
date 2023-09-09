import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://sys.arco.com.py/api';
//const baseURL = 'http://127.0.0.1:8000/api';

const pacientesApi = axios.create({ baseURL });

pacientesApi.interceptors.request.use(
    async(config:any)=>{
        const token = await AsyncStorage.getItem('token')
        // return console.log('Bearer '+ token);
        
        if(token){
           config.headers['Authorization'] = 'Bearer ' + token
        }
        return config;
    }
        
)


export default pacientesApi;