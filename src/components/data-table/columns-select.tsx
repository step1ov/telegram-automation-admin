import {Checkbox, Divider, theme} from "antd";
import React, {ReactNode} from "react";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {ColumnsType, ColumnType} from "antd/lib/table";

const { useToken } = theme;

export interface ColumnsSelectProps {
    columns: ColumnsType<any>,
    values: Record<string, boolean>,
    onChange: (e: CheckboxChangeEvent, col: ColumnType<any>) => void,
    onCheckAllChange: (e: CheckboxChangeEvent) => void
}

const ColumnsSelect = ({columns, values, onChange, onCheckAllChange} : ColumnsSelectProps) => {

    const { token } = useToken();

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        padding: '8px'
    };

    return (
        <div style={contentStyle}>
            <Checkbox onChange={onCheckAllChange}
                      checked={values && columns.length === Object.keys(values).length && Object.values(values).every(x => x)}>
                Выбрать все
            </Checkbox>
            <Divider style={{ margin: '8px 0' }} />
            {
                columns.map((x, index) =>
                    <div key={index} style={{ margin: '4px 0' }}>
                        <Checkbox checked={values && values[x.key as string]}
                                  onChange={(e) => onChange(e, x)}>
                            {x.title as ReactNode}
                        </Checkbox>
                    </div>
                )
            }
        </div>
    )
}

ColumnsSelect.defaultProps = {
    values: {}
}

export default ColumnsSelect;
