import axios, {AxiosError} from "axios";
import TelegramUser from "@/components/telegram/telegram-user";
import {Alert, Button, Card, Form, Input, Select, Spin} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import useTelegramChannels from "@/hooks/telegram/use-telegram-channels";
import formatTgUser from "@/components/telegram/format-tg-user";

export interface TelegramChannelsProps {
    userId: string,
    userData: Partial<TelegramUser> | AxiosError | any,
}

const { TextArea } = Input;

const validateMessages = {
    required: 'Все поля обязательны для заполнения',
};

const TelegramChannels= ({userData, userId}: TelegramChannelsProps) => {

    const { error, data, isLoading, mutate } = useTelegramChannels(userData?.id ? userId : null);
    const [form] = Form.useForm();
    const [isBusy, setIsBusy] = useState(false);
    const receiver = Form.useWatch('receiver', form);
    const message = Form.useWatch('message', form);
    const [ result, setResult ] = useState<ResultMessage | undefined>(undefined);
    const [ selectedChat, setSelectedChat ] = useState<any>(null);

    const dataLoaded = useMemo(() => data && !error && data.users && Array.isArray(data.chats), [data, error])
    const options = useMemo(() => dataLoaded ?
        data.chats.filter((chat: TelegramChat) => chat._ === 'chat' && !chat.left)
            .map((chat: TelegramChat) => ({ value: chat.id, label: chat.title, })) :
        [],
        [dataLoaded, data?.chats]);

    useEffect(() => {
        if (receiver) {
            const chat = data.chats.find((chat: TelegramChat) => chat.id === receiver);
            if (chat){
                setSelectedChat(chat);
            } else {
                setSelectedChat(null);
            }
        } else {
            setSelectedChat(null);
        }
    }, [data?.chats, receiver])

    const onFinish = async ({ receiver, message } : { receiver : string, message: string }) => {
        setIsBusy(true);
        if (dataLoaded) {
            const chat = data.chats.find((chat: TelegramChat) => chat.id === receiver);
            if (chat) {
                axios.post('/telegram/send-message-chat',
                    { id: userId, chatId: chat.id, message } ).then(response => {
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

    const handleLoadMessages = () => {
        setIsBusy(true);
        if (dataLoaded && receiver) {
            const chat = data.chats.find((chat: TelegramChat) => chat.id === receiver);
            if (chat) {
                axios.post('/telegram/get-messages-chat',
                    { id: userId, chatId: chat.id } ).then(response => {
                    console.log("messages", response.data);
                }).catch((error) => {
                    console.error(error);
                    setResult({
                        message: "Ошибка загрузки сообщений",
                        type: "error"
                    });
                });
            } else {
                setResult({
                    message: "Чат не найден",
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
    }

    return (
        <Card title={'Чаты'} style={{marginBottom: 24}}>
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
                {
                    !!selectedChat &&
                    <p>ID: {selectedChat.id}</p>
                }
                <Form.Item name="message" rules={[{ required: true }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isBusy || !receiver || !message} >
                        {isBusy ? <Spin/> : 'Отправить сообщение'}
                    </Button>{' '}
                    <Button type="primary" onClick={handleLoadMessages} disabled={isBusy || !receiver} >
                        {isBusy ? <Spin/> : 'Загрузить сообщения'}
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

export default TelegramChannels;
