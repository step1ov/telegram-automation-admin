import axios, {AxiosError} from "axios";
import TelegramUser from "@/components/telegram/telegram-user";
import {Alert, Button, Card, Form, Input, Select, Spin} from "antd";
import React, {useMemo, useState} from "react";
import useTelegramContacts from "@/hooks/telegram/use-telegram-contacts";
import formatTgUser from "@/components/telegram/format-tg-user";

export interface TelegramContactsProps {
    userId: string,
    userData: Partial<TelegramUser> | AxiosError | any,
}

const { TextArea } = Input;

const validateMessages = {
    required: 'Все поля обязательны для заполнения',
};

const TelegramContacts = ({userData, userId}: TelegramContactsProps) => {

    const { error, data, isLoading, mutate } = useTelegramContacts(userData?.id ? userId : null);
    const [form] = Form.useForm();
    const [isBusy, setIsBusy] = useState(false);
    const receiver = Form.useWatch('receiver', form);
    const message = Form.useWatch('message', form);
    const [ result, setResult ] = useState<ResultMessage | undefined>(undefined);

    const dataLoaded = useMemo(() => data && !error && data.users && Array.isArray(data.users), [data, error])
    const options = useMemo(() => dataLoaded ?
        data.users.map((user: Partial<TelegramUser>) => ({ value: user.id, label: formatTgUser(user), })) :
        [],
        [dataLoaded]);

    const onFinish = async ({ receiver, message } : { receiver : string, message: string }) => {
        setIsBusy(true);
        if (dataLoaded) {
            const user = data.users.find((user: Partial<TelegramUser>) => user.id === receiver);
            if (user) {
                axios.post('/telegram/send-message',
                    { id: userId, userId: user.id, userHash: user.access_hash.toString(), message } ).then(response => {
                    if (response.data?.id) {
                        setResult({
                            message: "Сообщение успешно отправлено",
                            type: "success"
                        });
                        form.setFieldValue('message', '');
                        setTimeout(() => setResult(undefined), 1000);
                    } else {
                        setResult({
                            message: "Не удалось отправить сообщение",
                            type: "error"
                        });
                    }
                }).catch((error) => {
                    console.error(error);
                    setResult({
                        message: "Ошибка отправки сообщения",
                        type: "error"
                    });
                });
            } else {
                setResult({
                    message: "Адресат не найден",
                    type: "error"
                });
            }
        } else {
            setResult({
                message: "Данные еще не загружены",
                type: "error"
            });
        }
        setIsBusy(false);
    };

    const onFinishFailed = (errorInfo : any) => {
        console.log('Failed:', errorInfo);
        setResult(undefined);
        setIsBusy(false);
    };

    return (
        <Card title={'Контакты'} style={{marginBottom: 24}}>
            <Form name="basic"
                  onFinish={onFinish}
                  validateMessages={validateMessages}
                  form={form}
                  onFinishFailed={onFinishFailed}>
                <Form.Item name="receiver" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ? option?.label.toString().toLowerCase() : '').includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ? optionA?.label.toString() : '').toLowerCase()
                                .localeCompare((optionB?.label ? optionB?.label.toString() : '').toLowerCase())
                        }
                        options={options}
                    />
                </Form.Item>
                <Form.Item name="message" rules={[{ required: true }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isBusy || !receiver || !message} >
                        {isBusy ? <Spin/> : 'Отправить сообщение'}
                    </Button>
                </Form.Item>
                {
                    !!result &&
                    <Form.Item>
                        <Alert message={result.message} type={result.type}/>
                    </Form.Item>
                }
            </Form>
        </Card>
    )
}

export default TelegramContacts;
