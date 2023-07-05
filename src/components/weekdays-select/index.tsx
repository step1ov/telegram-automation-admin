import React from "react";
import { Button, Space } from 'antd';
import weekdaysShort from "@/data/date/weekdays-short";

export interface WeekdaysSelectProps {
    value?: number[],
    onChange?: (data: number[]) => void,
}

const WeekdaysSelect = ({value, onChange}: WeekdaysSelectProps) => {

    const handlePress = (index: number) => {
        const pos = value ? value.indexOf(index) : -1;
        const copy = value ? [...value] : [];
        if (pos > -1) {
            copy.splice(pos, 1);
        } else {
            copy.push(index);
        }
        onChange && onChange(copy);
    }

    return (
        <Space wrap>
            {
                weekdaysShort.map((x, index) =>  {
                    const isSelected = value?.includes(index);
                    return (
                        <Button key={index}
                                type={isSelected ? 'primary' : 'default'}
                                shape="circle"
                                size={'middle'}
                                onClick={() => handlePress(index)}>{x}</Button>
                    );
                })
            }
        </Space>
    )
}

export default WeekdaysSelect;
