import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse, Usuario, loginData } from '../interfaces/AppInterfaces';
import { AuthState, authReduce } from './authReduce';
import pacientesApi from '../api/pacientesApi';

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: undefined,
    errorMessage: ''
}

type authContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | undefined;
    status: 'checking' | 'authenticated' | 'notAuthenticated';
    singUp: () => void;
    singIn: (loginData: loginData) => void;
    logOut: () => void;
    removeError: () => void;
}

export const authContext = createContext({} as authContextProps);

export const AuthProvider = ({children}:{children:JSX.Element | JSX.Element[]}) => {

    useEffect(() => {
        validacionToken();
    }, [])


    const validacionToken = async () => {
        const token = await AsyncStorage.getItem('token');

        //Si el token, no esta autenticado
        if (!token) return dispacth({
            type: 'notAuthenticated'
        });

        //Si el token esta autenticado
        const {status,data} = await pacientesApi.get('/user')

        console.log('Esta es la informacion del Usuario: '+ data);

        if (status !== 200) {
            return dispacth({ type: 'notAuthenticated' })
        }

       

       dispacth({
        type: 'singUp',
        payload: {
            token: data.access_token,
            user: data.name
        }
       })
    }

    const userData = async (credentials:LoginResponse) =>{
        if(credentials instanceof Object){
            try{
                const resp = await pacientesApi.get<Usuario>('/user')
                return resp.data
                

            }catch(error:any){
                console.log(error.response.data.error);
                
            }
        }
    }


    const [state, dispacth] = useReducer(authReduce, authInitialState);

    const singIn = async ({ cedula, password }: loginData) => {

        try {
            const resp = await pacientesApi.post<LoginResponse>('/paciente/login', { cedula, password });
            
            await AsyncStorage.setItem('token', resp.data.access_token);

            const { data } = await pacientesApi.get('/user');

            const usuario = await userData(data);
            dispacth({
                type: 'singUp',
                payload: {
                    token: resp.data.access_token,
                    user: usuario
                }
            }
            );
            // console.log(data.access_token);

            

        } catch (error) {
            console.error(error);
            dispacth({
                type: 'addError',
                payload: 'Las credenciales no son Correctas'
            })
        }
    };

    const singUp = () => {

    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');

        dispacth({type:'logout'})
    };

    const removeError = () => {
        dispacth({
            type: 'removeError'
        })
    };

    return (
        <authContext.Provider
            value={{
                ...state,
                singIn,
                singUp,
                logOut,
                removeError,
            }}
        >
            {children}
        </authContext.Provider>
    )
} 