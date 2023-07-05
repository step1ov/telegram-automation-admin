import {Alert, Button, Form, InputNumber, Spin} from "antd";
import React, {useState} from "react";
import axios from "axios";

export interface CodeFormProps {
    userId: string,
    result: ResultMessage | undefined,
    setResult: (result: ResultMessage | undefined) => void,
    onCancel: () => void
}

const validateMessages = {
    required: 'Код не может быть пустым пустым',
};

const CodeForm = ({result, setResult, userId, onCancel}: CodeFormProps) => {
    const [form] = Form.useForm();
    const code = Form.useWatch('code', form);
    const [isBusy, setIsBusy] = useState(false);
    const onFinish = async ({ code } : { code : string }) => {
        setIsBusy(true);
        axios.post('/telegram/signin', { code, id: userId } ).then(response => {
            console.log("CodeForm response.data", response.data)
            if (response.data?.ok) {
                setResult({
                    message: "Пользователь авторизирован",
                    type: "success"
                })
            } else {
                setResult({
                    message: "Не удалось авторизироваться",
                    type: "error"
                })
            }
        }).catch((error) => {
            console.error(error);
            setResult({
                message: "Ошибка авторизации",
                type: "error"
            });
        }).finally(() => {
            setIsBusy(false);
        });
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

            <p>Введите числовой код, который придет к вам в Телеграм:</p>

            <Form.Item name="code" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }}
                             disabled={isBusy}
                             placeholder={'Код из Телеграм'} />
            </Form.Item>

            {
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isBusy || !code || code.length < 4} >
                        {isBusy ? <Spin/> : 'Войти в профиль'}
                    </Button>{' '}
                    <Button type="default" disabled={isBusy} onClick={onCancel}>
                        {'Отмена'}
                    </Button>
                </Form.Item>
            }
            {
                !!result &&
                <Form.Item>
                    <Alert message={result.message} type={result.type}/>
                </Form.Item>
            }
        </Form>
    )
}

export default CodeForm;
