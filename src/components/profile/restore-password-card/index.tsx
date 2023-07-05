import {Alert, Button, Card, Form, Input, Result, Spin} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import useUserContext from "@/context/user/use-user-context";
import LoadingLayout from "@/layouts/loading-layout";
import Link from "next/link";
import styles from "@/components/profile/forgot-password-card/styles.module.scss";

type RestorePasswordResultProps = {
    emailEncrypted: string,
    otp: string
}

const validateMessages = {
    required: 'Поле не должно быть пустым',
};

const getErrorMessage = (status: number | undefined) => {
    let res = 'Неизвестная ошибка';
    if (status) {
        switch (status) {
            case 401:
                res = 'Пользователь не найден';
                break;
            case 402:
            case 403:
                res = 'Неверная ссылка';
                break;
            case 404:
                res = 'Срок действия ссылки истек';
                break;
        }
    }
    res += ', попробуйте произвести восстановление повторно';
    return res;
}

const RestorePasswordCard= ({emailEncrypted, otp} : RestorePasswordResultProps) => {
    const userContext = useUserContext();
    const { isBusy, restorePasswordValidate } = userContext;
    const [ validationError, setValidationError ] = useState<string | undefined>(undefined);
    const [ result, setResult ] = useState<ResultMessage | undefined>(undefined);
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const res = await restorePasswordValidate({emailEncrypted, otp});
            setValidationError(res?.error ? getErrorMessage(res?.status) : '');
        })();
    }, [])

    const onFinish = async ({password, confirm}: {password: string, confirm: string}) => {
        const res = await userContext.restorePasswordReset({emailEncrypted, otp, password, confirm});
        if (res) {
            if (res.ok) {
                setResult({
                    type: 'success',
                    message: 'Пароль успешно изменен',
                });
                form.resetFields();
            } else {
                setResult({
                    type: 'error',
                    message: getErrorMessage(res?.status)
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

    if (validationError === undefined && isBusy) {
        return (
            <LoadingLayout/>
        )
    }

    if (validationError) {
        return (
            <Result
                status="error"
                title="Ошибка проверки ссылки"
                subTitle={validationError}
                extra={[
                    <Link key={''} href={'/login'}>
                        <Button icon={<LeftOutlined />} size="large" >
                            На страницу входа
                        </Button>
                    </Link>
                ]}
            />
        )
    }

    if (result?.type === 'success') {
        return (
            <Result
                status="success"
                title="Пароль успешно изменен!"
                subTitle="Теперь вы можете перейти на страницу входа и войти с новым паролем"
                extra={[
                    <Link key={''} href={'/login'}>
                        <Button icon={<LeftOutlined />} size="large" >
                            На страницу входа
                        </Button>
                    </Link>
                ]}
            />
        )
    }

    return (
        <Card title={"Забыли пароль?"}>
            <p>Укажите новый пароль. Пароль должен содержать не менее 8 символов, хотя бы одну цифру и спецсимвол.</p>
            <Form name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  validateMessages={validateMessages}
                  form={form}
                  onFinishFailed={onFinishFailed}>

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
                                       return Promise.reject(new Error('Пароли не совпадают'));
                                   },
                               }),
                           ]}
                >
                    <Input.Password />
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
                            {isBusy ? <Spin/> : 'Сохранить'}
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

export default RestorePasswordCard;
