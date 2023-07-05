import axios from "axios";

export type UserServiceResultBase = {
    ok: boolean,
    error?: string,
    status?: number
}

export interface UserServiceResult extends UserServiceResultBase {
    data?: UserDataType;
}

const ErrorHandler = (error : any): UserServiceResult => {
    if (error.response) {
        // Запрос был сделан, и сервер ответил кодом состояния, который
        // выходит за пределы 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return ({ ok: false, error: "Login HTTP error: " + error.response.status, status: error.response.status });
    } else if (error.request) {
        // Запрос был сделан, но ответ не получен
        // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
        // http.ClientRequest в node.js
        console.log(error.request);
        return ({ ok: false, error: "Login HTTP error: No server response" });
    }
    // Произошло что-то при настройке запроса, вызвавшее ошибку
    console.log('Error', error.message);
    return ({ ok: false, error: "Login HTTP error: " + error.message });
}

const UserService = {
    login: async (username : string, password: string) : Promise<UserServiceResult> => {
        return axios.get('/auth/login', {
            params: {
                username, password
            }
        }).then(response => {
            const data: UserDataType = response.data;
            const { access_token } = data;
            localStorage.setItem('access_token', access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            return ({ ok: true, data });
        }).catch((error) => {
            return ErrorHandler(error);
        });
    },
    logout: () => {
        localStorage.removeItem('access_token');
        delete axios.defaults.headers.common['Authorization'];
    },
    isLoggedIn: async () : Promise<UserDataType | null | undefined> => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            return axios.get('/profile').then(response => {
                const user: UserType = response.data;
                localStorage.setItem('access_token', access_token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                return { access_token, user };
            }).catch((error) => {
                ErrorHandler(error);
                return null;
            });
        }
        return null;
    },
    update: async (access_token: string, user: Partial<UserType>) : Promise<UserServiceResult> => {
        return axios.post('/profile/update', user).then(response => {
            const user: UserType = response.data;
            return { ok: true, data: { access_token, user }};
        }).catch((error) => {
            return ErrorHandler(error);
        });
    },
    changePassword: async (access_token: string, dto: UserChangePasswordDataType) : Promise<UserServiceResult> => {
        return axios.post('/profile/change-password', dto).then(response => {
            const user: UserType = response.data;
            return { ok: true, data: { access_token, user }};
        }).catch((error) => {
            return ErrorHandler(error);
        });
    },
    restorePasswordRequest: async (email: string) : Promise<UserServiceResultBase> => {
        return axios.post('/password-restore/req', { email }).then(() => {
            return { ok: true };
        }).catch((error) => {
            return ErrorHandler(error);
        });
    },
    restorePasswordValidate: async (dto: UserRestorePasswordValidateType) : Promise<UserServiceResultBase> => {
        return axios.post('/password-restore/validate', dto).then(() => {
            return { ok: true };
        }).catch((error) => {
            return ErrorHandler(error);
        });
    },
    restorePasswordReset: async (dto: UserRestorePasswordResetType) : Promise<UserServiceResultBase> => {
        return axios.post('/password-restore/reset', dto).then(() => {
            return { ok: true };
        }).catch((error) => {
            return ErrorHandler(error);
        });
    },
}

export default UserService;
