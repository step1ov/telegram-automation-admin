import {Alert, Button, Card, Form, Input, Result, Spin} from "antd";
import {LeftOutlined, UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import React, {useState} from "react";
import useUserContext from "@/context/user/use-user-context";
import styles from "./styles.module.scss";

const validateMessages = {
    required: 'Поле не должно быть пустым',
    types: {
        email: 'Неверный формат email!',
    }
};

const ForgotPasswordCard = () => {
    const userContext = useUserContext();
    const { isBusy, restorePasswordRequest } = userContext;
    const [form] = Form.useForm();
    const [ result, setResult ] = useState<ResultMessage | undefined>(undefined);

    const onFinish = async ({ email } : { email : string }) => {
        const res = await restorePasswordRequest(email);
        if (res) {
            if (res.ok) {
                setResult({
                    type: 'success',
                    message: `Инструкции по восстановлению пароля оправлены на ${email}`,
                });
                form.resetFields();
            } else {
                setResult({
                    type: 'error',
                    message: res.status === 400 ? "Пользователь не найден" : "Ошибка восстановления пароля",
                });
            }
        } else {
            setResult({
                type: 'error',
                message: "Неизвестная ошибка восстановления пароля",
            });
        }
    };

    const onFinishFailed = (errorInfo : any) => {
        console.log('Failed:', errorInfo);
        setResult(undefined);
    };

    return (
        !!result && result.type === 'success' ?
            <Result
                status="success"
                title="Письмо для восстановления пароля отправлено"
                subTitle={result.message}
                extra={[
                    <Link key={1} href={'/login'}>
                        <Button icon={<LeftOutlined />} size="large" type="primary" >
                            На страницу входа
                        </Button>
                    </Link>
                ]}
            /> :
            <Card title={"Забыли пароль?"}>
                <p>Укажите ваш <strong>Email</strong>. На него будет отправлено псьмо для восстановления пароля</p>
                <Form name="basic"
                      onFinish={onFinish}
                      validateMessages={validateMessages}
                      form={form}
                      onFinishFailed={onFinishFailed}>

                    <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<UserOutlined className={styles.icon} />}
                               size="large" className={styles.input} disabled={isBusy}
                               placeholder={'Email'} />
                    </Form.Item>

                    <Form.Item>
                        <div className={styles.buttons} >
                            <Link href={'/login'}>
                                <Button icon={<LeftOutlined />} className={styles.back} size="large" >
                                    Назад
                                </Button>
                            </Link>
                            <Button type="primary" htmlType="submit" disabled={isBusy}
                                    className={styles.submit} size="large" >
                                {isBusy ? <Spin/> : 'Восстановить'}
                            </Button>
                        </div>
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

export default ForgotPasswordCard;
