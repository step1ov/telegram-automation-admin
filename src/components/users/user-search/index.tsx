import React, {CSSProperties, useEffect, useState} from "react";
import {AutoComplete, Button, Input} from "antd";
import getUserDisplayText from "@/utils/users/get-user-display-text";
import axios from "axios";

export interface UserSearchProps {
    value?: Partial<UserType>,
    onChange?: (user: Partial<UserType> | undefined) => void,
    style?: CSSProperties,
    disabled?: boolean
}

export interface UserSearchOption {
    value: string,
    item: Partial<UserType>,
}

const UserSearch = ({value, onChange, style, disabled}: UserSearchProps) => {
    const [showId, setShowId] = useState(false);
    const [options, setOptions] = useState<UserSearchOption[]>([]);
    const [text, setText] = useState('');

    const handleSelect = (value: string, option: UserSearchOption) => {
        onChange && onChange(option.item)
    };

    const handleClear = () => {
        onChange && onChange(undefined)
    }

    const handleTextChange = (data: string) => {
        setText(data);
    };

    useEffect(() =>{
        setText(getUserDisplayText(value) || '')
    }, [value])

    const handleSearch = (search: string) => {
        if (search && search.trim()) {
            axios.get('users', {
                params: {
                    limit: 6,
                    sortField: 'displayName',
                    sortOrder: 'asc',
                    search: search.trim()
                }})
                .then(res => {
                    if ('records' in res.data) {
                        setOptions(res.data.records.map((x: UserType) => ({value: getUserDisplayText(x), item: x})))
                    }
                })
                .catch(e => {
                    console.error(e);
                })
        } else {
            setOptions([]);
        }
    }

    return (
        <>
            <AutoComplete
                allowClear
                value={text}
                options={options}
                style={style}
                onSelect={handleSelect}
                onSearch={handleSearch}
                onChange={handleTextChange}
                placeholder="Введите имя или email"
                onClear={handleClear}
                disabled={disabled}
            />
            {
                !!value && (
                    showId ?
                        <Input style={{ marginTop: '16px' }} addonBefore="ID" value={value.id}/> :
                        <Button type={'link'} size={'small'} onClick={() => setShowId(true)}>Показать идентификатор</Button>
                )
            }
        </>

    )
}

export default UserSearch;
