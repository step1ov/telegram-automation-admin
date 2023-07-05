import React, {useEffect, useState} from "react";
import UserContext, {UserContextDataInitial} from "./user.context";
import UserService, {UserServiceResult, UserServiceResultBase} from "@/services/user.service";
import {useRouter} from "next/router";

const LOGIN_PAGE_PATH = '/login';
const DASHBOARD_PAGE_PATH = '/dashboard';
const PUBLIC_PATHS = [
    LOGIN_PAGE_PATH, '/registration', '/forgot-password', '/restore-password'
]

const UserProvider = ({children}: {children: any}) => {

    const [ data, setData ] = useState<UserDataType>({...UserContextDataInitial});
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isBusy, setIsBusy ] = useState<boolean>(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        checkIsLoggedIn();
    }, [])

    const isPublicPath = () =>
        PUBLIC_PATHS.some(x => router.pathname.startsWith(x)) || router.pathname === '/'

    const goToLogin = () => !isPublicPath() && router.push(LOGIN_PAGE_PATH);
    const goToDashboard = () => isPublicPath() && router.push(DASHBOARD_PAGE_PATH);

    const checkIsLoggedIn = async () => {
        setIsLoading(true);
        const res = await UserService.isLoggedIn();
        if (res) {
            setData(res as UserDataType);
            setIsLoggedIn(true);
            setIsLoading(false);
            goToDashboard();
        } else {
            setIsLoggedIn(false);
            setData({...UserContextDataInitial});
            setIsLoading(false);
            goToLogin();
        }
    }

    const login = async (username : string, password: string): Promise<UserServiceResult | undefined> => {
        if (!isLoading && !isBusy) {
            setIsBusy(true);
            const res = await UserService.login(username, password);
            if (res.ok) {
                setData(res.data as UserDataType);
                setIsLoggedIn(true);
                setIsBusy(false);
                goToDashboard();
            } else {
                setIsLoggedIn(false);
                setData({...UserContextDataInitial});
                setIsBusy(false);
            }
            return res;
        }
        return undefined;
    }

    const logout = () => {
        UserService.logout();
        setIsLoggedIn(false);
        setData({...UserContextDataInitial});
        goToLogin();
    }

    const update = async (user: Partial<UserType>): Promise<UserServiceResult | undefined> => {
        if (!isLoading && !isBusy && data.access_token) {
            setIsBusy(true);
            const res = await UserService.update(data.access_token, user);
            if (res.ok) {
                setData(res.data as UserDataType);
            }
            setIsBusy(false);
            return res;
        }
        return undefined;
    }

    const changePassword = async (dto: UserChangePasswordDataType): Promise<UserServiceResult | undefined> => {
        if (!isLoading && !isBusy && data.access_token) {
            setIsBusy(true);
            const res = await UserService.changePassword(data.access_token, dto);
            if (res.ok) {
                setData(res.data as UserDataType);
            }
            setIsBusy(false);
            return res;
        }
        return undefined;
    }

    const restorePasswordRequest = async (email: string): Promise<UserServiceResultBase | undefined> => {
        if (!isLoading && !isBusy) {
            setIsBusy(true);
            const res = await UserService.restorePasswordRequest(email);
            setIsBusy(false);
            return res;
        }
        return undefined;
    }

    const restorePasswordValidate = async (dto: UserRestorePasswordValidateType): Promise<UserServiceResultBase | undefined> => {
        if (!isLoading && !isBusy) {
            setIsBusy(true);
            const res = await UserService.restorePasswordValidate(dto);
            setIsBusy(false);
            return res;
        }
        return undefined;
    }

    const restorePasswordReset = async (dto: UserRestorePasswordResetType): Promise<UserServiceResultBase | undefined> => {
        if (!isLoading && !isBusy) {
            setIsBusy(true);
            const res = await UserService.restorePasswordReset(dto);
            setIsBusy(false);
            return res;
        }
        return undefined;
    }

    return (
        <UserContext.Provider value={{
            data,
            isLoading,
            isBusy,
            isLoggedIn,
            setData,
            checkIsLoggedIn,
            login,
            logout,
            update,
            changePassword,
            restorePasswordRequest,
            restorePasswordValidate,
            restorePasswordReset
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
