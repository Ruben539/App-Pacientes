export interface LoginResponse {
    access_token: string;
    token_type:   string;
    expires_at:   Date;
}

export interface Usuario {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    celular:           string;
    sucursal_id:       number;
    role_id:           number;
    fecha_nacimiento:  string;
    cedula:            string;
    avatar_link:       string;
    nro_registro:      null;
    sexo:              string;
    deleted_at:        null;
    created_at:        Date;
    updated_at:        Date;
    edad:              number;
}

export interface loginData {
    cedula:string,
    password:string
}

export interface UsuarioType {
    cod:     string;
    message: string;
    data:    Usuario[];
}
