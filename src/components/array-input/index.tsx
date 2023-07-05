import {Button, Form, Input} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React, {CSSProperties} from "react";
import {ValidatorRule} from "rc-field-form/lib/interface";

export interface ArrayInputProps {
    name: string | number | (string | number)[];
    rules?: ValidatorRule[];
    initialValue?: any[];
    placeholder?: string,
    inputStyle?: CSSProperties,
    // value?: any,
    // onChange?: (data: any) => void,
}

const ArrayInput = ({ name, rules, initialValue, placeholder, inputStyle }: ArrayInputProps) => {
    return (
        <Form.List name={name} rules={rules} initialValue={initialValue} >
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                        <Form.Item required={false} key={field.key} style={{marginBottom: '6px'}}>
                            <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input text",
                                    },
                                ]}
                                noStyle
                            >
                                <Input placeholder={placeholder}
                                       style={inputStyle}
                                       addonAfter={fields.length > 1 && <MinusCircleOutlined onClick={() => remove(field.name)}/>}/>
                            </Form.Item>
                        </Form.Item>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                            Добавить
                        </Button>
                        <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
            )}
        </Form.List>
    )
}

export default ArrayInput;
