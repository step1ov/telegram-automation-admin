import {Alert, Button, Form, InputNumber, Spin} from "antd";
import React, {useState} from "react";
import axios from "axios";

export interface PhoneFormProps {
    userId: string,
    result: ResultMessage | undefined,
    setResult: (result: ResultMessage | undefined) => void,
    readOnly?: boolean
}

const validateMessages = {
    required: 'Телефон не может быть пустым пустым',
};

const PhoneForm = ({result, setResult, userId, readOnly}: PhoneFormProps) => {
    const [form] = Form.useForm();
    const phone = Form.useWatch('phone', form);
    const [isBusy, setIsBusy] = useState(false);
    const onFinish = async ({ phone } : { phone : string }) => {
        setIsBusy(true);
        axios.post('/telegram/send-code', { phone, id: userId } ).then(response => {
            console.log("PhoneForm response.data", response.data)
            if (response.data?.ok) {
                setResult({
                    message: "Код успешно отправлен",
                    type: "success"
                })
            } else {
                setResult({
                    message: "Не удалось отправить код",
                    type: "error"
                });
            }
        }).catch((error) => {
            console.error(error);
            setResult({
                message: "Ошибка отправки кода",
                type: "error"
            });
        }).finally(() => {
            setIsBusy(false);
        })
    };

    const onFinishFailed = (errorInfo : any) => {
        console.log('Failed:', errorInfo);
        setResult(undefined);
        setIsBusy(false);
    };

    return (
        <Form name="basic"
              onFinish={onFinish}
              validateMessages={validateMessages}
              form={form}
              onFinishFailed={onFinishFailed}>

            <p>Пользователь не авторизирован, необходимо выполнить вход по номеру телефона:</p>

            <Form.Item name="phone" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} disabled={isBusy} placeholder={'Номер телефона без +'} readOnly={readOnly} />
            </Form.Item>

            {
                !readOnly &&
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isBusy || !phone || phone.toString().length < 10} >
                        {isBusy ? <Spin/> : 'Отправить код'}
                    </Button>
                </Form.Item>
            }
            {
                !!result && !readOnly &&
                <Form.Item>
                    <Alert message={result.message} type={result.type}/>
                </Form.Item>
            }
        </Form>
    )
}

export default PhoneForm;
