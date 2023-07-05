import TelegramUser from "@/components/telegram/telegram-user/index";
import formatTgUser from "@/components/telegram/format-tg-user";
import React, {useState} from "react";
import {Alert, Button, Spin} from "antd";
import axios, {AxiosError} from "axios";

export interface UserCardProps {
    userId: string,
    userData: Partial<TelegramUser> | AxiosError | any,
    onLogoutDone: () => void
}

const UserCard = ({userId, userData, onLogoutDone} : UserCardProps) => {

    const [isBusy, setIsBusy] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = async () => {
        setIsBusy(true);
        axios.get(`/telegram/${userId}/logout` ).then(response => {
            if (response.data?.ok) {
                onLogoutDone();
                console.log("Logout data", response.data?.data);
            } else {
                setError("Не удалось выйти");
            }
        }).catch((error) => {
            console.error(error);
            setError("Ошибка выхода");
        }).finally(() => {
            setIsBusy(false);
        });
    };

    return (
        <>
            <p>Вы вошли в профиль Телеграм как <strong>{formatTgUser(userData)}</strong></p>
            <Button type="primary" disabled={isBusy} onClick={handleLogout}>
                {isBusy ? <Spin/> : 'Выйти из профиля'}
            </Button>
            {
                !!error &&
                <Alert style={{ marginTop: 16 }} message={error} type={'error'}/>
            }
        </>
    )
}

export default UserCard;
