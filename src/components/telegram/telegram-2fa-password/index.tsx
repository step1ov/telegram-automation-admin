import React, {useState} from "react";
import {Alert, Button, Card, Spin} from "antd";
import axios from "axios";

export interface Telegram2faPasswordProps {
    userId: string
}

const Telegram2faPassword = ({ userId }: Telegram2faPasswordProps) => {
    const [isBusy, setIsBusy] = useState(false);
    const [ result, setResult] = useState<ResultMessage | undefined>(undefined);

    const handleClick = async () => {
        setIsBusy(true);
        axios.get(`/telegram/${userId}/update2fa` ).then(response => {
            if (response.data?.ok) {
                console.log(response.data);

            } else {
                console.error(response.data);
                setResult({
                    message: "Не удалось обновить пароль",
                    type: "error"
                })
            }
        }).catch((error) => {
            console.error(error);
            setResult({
                message: "Не удалось обновить пароль",
                type: "error"
            })
        });
        setIsBusy(false);
    };

    return (
        <Card title={'Смена 2FA пароля'} style={{marginBottom: 24}}>
            <Button type="primary" disabled={isBusy} onClick={handleClick}>
                {isBusy ? <Spin/> : 'Сгенерировать пароль'}
            </Button>
            {
                !!result && <Alert style={{ marginTop: 12 }} message={result.message} type={result.type}/>
            }
        </Card>
    );
}

export default Telegram2faPassword;
