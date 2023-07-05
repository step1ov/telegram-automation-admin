import {Alert, Button, Card, Descriptions, Form, Input} from "antd";
import React, {useState} from "react";
import useUserContext from "@/context/user/use-user-context";
import dayjs from "dayjs";

const ProfilePasswordCard = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [ error, setError ] = useState('');
    const userContext = useUserContext();
    const { user } = userContext.data;

    const onFinish = async (values: UserChangePasswordDataType) => {
        const res = await userContext.changePassword(values);
        if (res?.ok) {
            setShowForm(false);
        } else if (res?.error) {
            setError(res.error);
        } else {
            setError('Неизвестная ошибка');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        setError(errorInfo.toString())
    };

    return (
        <Card title={'Пароль'} style={{marginBottom: 24}}>
            {
                showForm ?
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        name="changePassword"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item name="old" label={'Старый пароль'}
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Пожалуйста введите старый пароль',
                                       },
                                   ]}
                                   hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="password" label={'Новый пароль'}
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Пожалуйста введите новый пароль',
                                       },
                                   ]}
                                   hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="confirm" label={'Подтвердите пароль'}
                                   dependencies={['password']}
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Пожалуйста введите пароль повторно',
                                       },
                                       ({ getFieldValue }) => ({
                                           validator(_, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                           },
                                       }),
                                   ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="ghost" htmlType="button" style={{marginRight: "10px"}}
                                    onClick={() => setShowForm(false)}>
                                Отмена
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Form.Item>
                        {
                            error &&
                            <Form.Item>
                                <Alert message={error} type="error" />
                            </Form.Item>
                        }
                    </Form> :
                    <>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label={'Дата обновления'}>
                                {dayjs(user?.passwordUpdatedAt).format('DD.MM.YYYY HH:mm:ss')}
                            </Descriptions.Item>
                        </Descriptions>
                        <Button type="primary" size="large" style={{marginTop: 12}} onClick={() => setShowForm(true)}>
                            Сменить пароль
                        </Button>
                    </>
            }
        </Card>
    )
}

export default ProfilePasswordCard;
