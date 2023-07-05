import {DatePicker, DatePickerProps, Radio, RadioChangeEvent, Space} from 'antd';
import React from "react";
import dayjs from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
export interface PeriodSelectorValue {
    type: 'today' | 'yesterday' | 'week' | 'month' | 'quarter' | 'year' | 'date' | 'range';
    start?: Date | null;
    finish?: Date | null;
}

const options = [
    { label: 'Сегодня', value: 'today' },
    { label: 'Вчера', value: 'yesterday' },
    { label: 'Неделя', value: 'week' },
    { label: 'Месяц', value: 'month' },
    { label: 'Квартал', value: 'quarter' },
    { label: 'Год', value: 'year' },
    { label: 'Дата', value: 'date' },
    { label: 'Период', value: 'range' },
];

export interface PeriodSelectorProps {
    value?: PeriodSelectorValue;
    onChange?: (value: PeriodSelectorValue) => void;
}

const { RangePicker } = DatePicker;

const PeriodSelector = ({value, onChange}: PeriodSelectorProps) => {

    const onTypeChange = ({ target }: RadioChangeEvent) => {
        const prev = value || {};
        onChange && onChange({ ...prev, type: target.value });
    };

    const onDateChange: DatePickerProps['onChange'] = (date: dayjs.Dayjs | null) => {
        const prev = value || { type: 'date' };
        onChange && onChange({ ...prev, start: date ? date.toDate() : new Date() });
    }

    const onRangeChange = (data: DatePickerProps['value'] | RangePickerProps['value']) => {
        const prev: PeriodSelectorValue = value || { type: 'range' };
        const curr = {...prev};
        if (Array.isArray(data)){
            curr.start = data[0] ? data[0].toDate() : new Date();
            curr.finish = data[1] ? data[1].toDate() : null;
        } else {
            curr.start = data ? data.toDate() : new Date();
            curr.finish = null;
        }
        onChange && onChange(curr);
    };

    return (
        <Space>
            <Radio.Group
                options={options}
                onChange={onTypeChange}
                value={value?.type || 'today'}
                optionType="button"
                buttonStyle="solid"
            />
            {
                value?.type === 'date' &&
                <DatePicker onChange={onDateChange} placeholder={'Дата'} />
            }
            {
                value?.type === 'range' &&
                <RangePicker
                    format="DD.MM.YYYY"
                    onChange={onRangeChange}
                />
            }
        </Space>
    )
}

export default PeriodSelector;
