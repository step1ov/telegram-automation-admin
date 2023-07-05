import {Alert, Button, Card, Descriptions, Form, Input, InputNumber, Select,} from "antd";
import {EditOutlined} from "@ant-design/icons";
import UserGender from "../../users/user-gender";
import React, {useState} from "react";
import useUserContext from "@/context/user/use-user-context";
import genderOptions from "@/components/users/user-gender/gender-options";

const { TextArea } = Input;

const maxYear = (new Date()).getFullYear() - 10;
const minYear = maxYear - 100;

const ProfileUserInfoCard = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [ error, setError ] = useState('');
    const userContext = useUserContext();
    const { user } = userContext.data;

    const onFinish = async (values: Partial<UserType>) => {
        const res = await userContext.update(values);
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
        <Card title={'Основное'}
              extra={<Button icon={<EditOutlined />} onClick={() => setShowForm(prev => !prev)}>Редактировать</Button>}
              style={{marginBottom: 24}}>
            {
                showForm ?
                    <Form name="editProfile"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 16 }}
                          initialValues={{...user}}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                    >
                        <Form.Item label={'Email'}
                                   name="email"
                                   rules={[{ required: true, type: 'email', message: 'Пожалуйста, укажите email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label={'Имя пользователя'} name="username">
                            <Input />
                        </Form.Item>
                        <Form.Item label={'Имя'} name="firstName">
                            <Input />
                        </Form.Item>
                        <Form.Item label={'Фамилия'} name="lastName">
                            <Input />
                        </Form.Item>
                        <Form.Item name="gender" label={'Пол'} >
                            <Select options={genderOptions}/>
                        </Form.Item>
                        <Form.Item name="dob" label={'Год рождения'} >
                            <InputNumber min={minYear} max={maxYear} />
                        </Form.Item>
                        <Form.Item label={'О себе'} name="about">
                            <TextArea rows={4} />
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
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label={'Email'}>
                            {user?.email}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Имя пользователя'}>
                            {user?.username}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Имя'}>
                            {user?.firstName}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Фамилия'}>
                            {user?.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Год рождения'}>
                            {user?.dob}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Пол'}>
                            <UserGender value={user?.gender} />
                        </Descriptions.Item>
                        <Descriptions.Item label={'О себе'}>
                            {user?.about}
                        </Descriptions.Item>
                    </Descriptions>
            }
        </Card>
    )
}

export default ProfileUserInfoCard;
