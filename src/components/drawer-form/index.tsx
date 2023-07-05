import React, {useEffect} from "react";
import {Alert, Button, Descriptions, Drawer, Form} from "antd";
import {UseDrawerFormResult} from "@/components/drawer-form/hooks/use-drawer-form";
import {FormLayout} from "antd/es/form/Form";
import dayjs from "dayjs";

export interface DrawerFormProps extends UseDrawerFormResult{
    children?: any,
    formLayout: FormLayout,
    onValuesChange?: ((changedValues: any, values: any) => void) | undefined
}

const DrawerForm = ({
                        title,
                        children,
                        initialValues,
                        open,
                        onClose,
                        onFinish,
                        onFinishFailed,
                        formLayout,
                        error,
                        onValuesChange,
                        form: form_
                    }: DrawerFormProps) => {

    const [form] = Form.useForm();
    const usedForm = form_ ? form_ : form;
    useEffect(() => usedForm.resetFields(), [initialValues]);

    const renderChildren = () => {
        if (typeof children === 'function') {
            return children(initialValues, usedForm);
        }
        return children
    }

    return (
        <Drawer forceRender title={title} placement="right" onClose={onClose} open={open} width={560}>
            <Form
                form={usedForm}
                layout={formLayout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onValuesChange}
                initialValues={initialValues}
            >
                {renderChildren()}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>{' '}
                    <Button onClick={onClose}>
                        Отмена
                    </Button>
                </Form.Item>
                {
                    error &&
                    <Form.Item>
                        <Alert message={error} type="error" />
                    </Form.Item>
                }
                {
                    !!initialValues && !!initialValues.createdAt && !!initialValues.updatedAt &&
                    <Descriptions column={1} bordered size={'small'}>
                        <Descriptions.Item label="Создан">
                            {dayjs(initialValues.createdAt).format('DD.MM.YYYY HH:mm:ss')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Изменен">
                            {dayjs(initialValues.updatedAt).format('DD.MM.YYYY HH:mm:ss')}
                        </Descriptions.Item>
                    </Descriptions>
                }
            </Form>
        </Drawer>
    )
}

DrawerForm.defaultProps = {
    formLayout: 'vertical'
}

export default DrawerForm;
