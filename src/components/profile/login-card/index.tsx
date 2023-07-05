import {Alert, Button, Card, Form, Image, Input, Spin} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import React, {useState} from "react";
import useUserContext from "@/context/user/use-user-context";
import styles from "./styles.module.scss";

const usernameRules = [
    {
        required: true,
        message: "Имя пользователя не должно быть пустым",
    }
]

const passwordRules = [
    {
        required: true,
        message: "Пароль не должен быть пустым",
    }
]

const LoginCard = () => {
    const { login, isBusy } = useUserContext();
    const [ error, setError ] = useState('');

    const onFinish = async ({ username, password } : { username : string, password: string }) => {
        const res = await login(username, password);
        if (res && !res.ok) {
            setError(res.status === 401 ? "Неверный логин или пароль" : "Ошибка входа");
        } else {
            setError('');
        }
    };

    const onFinishFailed = (errorInfo : any) => {
        console.log('Failed:', errorInfo);
        setError('');
    };

    return (
        <Card cover={<Image alt="Logo" title="Logo" src={"/logo-bg.jpg"} preview={false}/>}>
            <Form name="basic"
                  initialValues={{remember: true,}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>

                <Form.Item name="username" rules={usernameRules}>
                    <Input prefix={<UserOutlined className={styles.icon} />}
                           size="large" className={styles.input}
                           placeholder={'Имя пользователя'} />
                </Form.Item>

                <Form.Item name="password" rules={passwordRules}>
                    <Input.Password prefix={<LockOutlined className={styles.icon} />}
                                    size="large" className={styles.input}
                                    placeholder={'Пароль'} />
                </Form.Item>

                <Form.Item>
                    {/*<Form.Item name="remember" valuePropName="checked" noStyle>*/}
                    {/*    <Checkbox>{'Запомнить меня'}</Checkbox>*/}
                    {/*</Form.Item>*/}
                    <Link className={styles.forgot} href="/forgot-password">
                        Забыли пароль
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isBusy}
                            className={styles.submit} size="large" >
                        {isBusy ? <Spin/> : 'Вход'}
                    </Button>
                    {/*<div style={{marginTop: '8px'}}>*/}
                    {/*    {'или '}*/}
                    {/*    <Link href="/registration">*/}
                    {/*        Регистрация*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                </Form.Item>
                {
                    error &&
                    <Form.Item>
                        <Alert message={error} type="error" />
                    </Form.Item>
                }
            </Form>
        </Card>
    )
}

export default LoginCard;
