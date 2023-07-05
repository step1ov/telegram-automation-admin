import {createContext} from 'react';
import {UserServiceResult, UserServiceResultBase} from "@/services/user.service";

export type UserContextServerResult = {
    status?: number,
    error?: string
}

export type UserContextType = {
    data: UserDataType,
    serverResult?: UserContextServerResult
    isLoading: boolean,
    isBusy: boolean,
    isLoggedIn: boolean,
    setData: (data: UserDataType) => void,
    checkIsLoggedIn : () => void,
    login: (username : string, password: string) => Promise<UserServiceResult | undefined>,
    logout: () => void,
    update: (user: Partial<UserType>) => Promise<UserServiceResult | undefined>,
    changePassword: (dto: UserChangePasswordDataType) => Promise<UserServiceResult | undefined>,
    restorePasswordRequest: (email: string) => Promise<UserServiceResultBase | undefined>,
    restorePasswordValidate: (dto: UserRestorePasswordValidateType) => Promise<UserServiceResultBase | undefined>,
    restorePasswordReset: (dto: UserRestorePasswordResetType) => Promise<UserServiceResultBase | undefined>,
}

export const UserContextDataInitial = {
    user: undefined,
    access_token: ''
};

export const UserContext = createContext<UserContextType>({
    data : {...UserContextDataInitial},
    isLoading: true,
    isBusy: false,
    isLoggedIn: false,
    setData: () => {},
    checkIsLoggedIn: () => {},
    login: async () => undefined,
    logout: () => {},
    update: async () => undefined,
    changePassword: async () => undefined,
    restorePasswordRequest: async () => undefined,
    restorePasswordValidate: async () => undefined,
    restorePasswordReset: async () => undefined,
});

export default UserContext;
