import {Button, Form, Input, Select, Space} from "antd";
import notificationCampaignLinkOptions from "@/data/notifications/notification-campaign-link-options";
import React, {CSSProperties, useState} from "react";
import useScreens from "@/hooks/screens/use-screens";
import styles from "./styles.module.scss";

export interface AppLinkData {
    title: string,
    linkType: 'screen' | 'external',
    extra: string
}

export interface AppLinkInputProps {
    value?: AppLinkData,
    onChange?: (data: AppLinkData | undefined) => void,
    style?: CSSProperties,
    disabled?: boolean,
    restField?: any
}

const {TextArea} = Input;
const LINK_PREFIX = 'app://';
const LINK_PREFIX_LEN = LINK_PREFIX.length;

const AppLinkInput = ({value, onChange, style, disabled, restField}: AppLinkInputProps) => {
    const _value: AppLinkData = value ? value : { title: '', linkType: 'screen', extra: '' }
    const { title, linkType, extra } = _value;
    const [dataEditable, setDataEditable] = useState<boolean>(false);

    const screens = useScreens();

    const handleChange = (nextValue: Partial<AppLinkData>) => {
        !!onChange && onChange({ ..._value, ...nextValue })
    }

    const screenMap: Record<string, ScreenType> = screens?.data && 'records' in screens.data ?
        screens.data.records.reduce((a, v) => ({ ...a, [v.link]: v}), {}) :
        {};

    const screenOptions = screens?.data && 'records' in screens.data ?
        screens.data.records.map(x => ({ value: x.link, label: x.title })).sort((a, b) => a.label.localeCompare(b.label)) :
        [];

    const isScreenMode = _value?.linkType === 'screen';
    let selectedScreen: ScreenType | undefined = undefined;
    let screenParams: Record<string, any> = {};
    if (isScreenMode && _value.extra?.startsWith(LINK_PREFIX)) {
        let link = _value.extra.substring(LINK_PREFIX_LEN);
        if (link.includes('?')) {
            const parts = link.split('?');
            link = parts[0];
            screenParams = Object.fromEntries(new URLSearchParams(parts[1]));
        } else {
            screenParams = {};
        }
        if (screenMap[link]) {
            selectedScreen = screenMap[link];
        }
    }

    const handleScreenChange = (link: string) => {
        if (isScreenMode && link && screenMap[link]) {
            handleChange({ extra: `app://${link}` })
        } else {
            handleChange({ extra: '' })
        }
    }

    const handleScreenParamChange = (key: string, value: any) => {
        if (isScreenMode && selectedScreen) {
            handleChange({
                extra: `app://${selectedScreen.link}?${new URLSearchParams({...screenParams, [key]: value}).toString()}`
            })
        }
    }

    return (
        <div className={styles.container}>
            <Form.Item label={'Заголовок'}
                       rules={[{ required: true, message: 'Пожалуйста введите заголовок ссылки' }]}
                       className={styles.field}
                       {...restField}
            >
                <Input value={title} onChange={(e) => handleChange({title: e?.target?.value})} />
            </Form.Item>
            <Form.Item label="Тип"
                       rules={[{ required: true, message: 'Пожалуйста укажите тип ссылки' }]}
                       className={styles.field}
                       {...restField}
            >
                <Select value={linkType}
                        options={notificationCampaignLinkOptions}
                        onChange={(linkType) => handleChange({linkType})}
                />
            </Form.Item>
            {
                isScreenMode &&
                <>
                    <Form.Item label="Экран"
                               rules={[{ required: true, message: 'Пожалуйста укажите экран' }]}
                               className={styles.field}
                    >
                        <Select value={selectedScreen?.link}
                                options={screenOptions}
                                onChange={handleScreenChange}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                        />
                    </Form.Item>
                    {
                        !!selectedScreen?.params &&
                        selectedScreen?.params.length > 0 &&
                        selectedScreen?.params.map((x, index) =>
                            <Form.Item label={`Параметр: ${x._id}`}
                                       className={styles.field}
                                       key={x._id}
                                       extra={x.description}
                            >
                                <Input value={screenParams[x._id]}
                                       onChange={(e) => handleScreenParamChange(x._id, e?.target?.value)} />
                            </Form.Item>
                        )
                    }
                </>
            }
            <Form.Item label={isScreenMode ? 'Данные' : 'Адрес внешней ссылки'}
                       className={styles.field}
                       {...restField}
            >
                <TextArea value={extra}
                          onChange={(e) => handleChange({extra: e?.target?.value})}
                          rows={2}
                          disabled={isScreenMode && !dataEditable}
                />
                {
                    isScreenMode &&
                    <Button style={{ width: 120, marginTop: '4px' }}
                            size={'small'}
                            onClick={() => setDataEditable((prevState) => !prevState)}>
                        {dataEditable ? 'Для просмотра' : 'Редактировать'}
                    </Button>
                }
            </Form.Item>
        </div>
    )
}

export default AppLinkInput;
