import {Alert, Card, Col, Descriptions, Progress, Row, Spin} from "antd";
import useSWR from "swr";
import axios, {AxiosError} from "axios";
import React, {useEffect} from "react";
// @ts-ignore
import * as humanizeDuration from 'humanize-duration';
import prettyBytes from 'pretty-bytes';
import styles from "./styles.module.scss";
import dayjs from "dayjs";

const SysInfo = () => {

    const { data, error, mutate } = useSWR<SysInfoType| AxiosError>(
        'sysinfo',
        (url) => axios.get(url).then(x => x.data).catch(e => e)
    );

    useEffect(() => {
        let timerId = setInterval(() => mutate(), 60000);
        return () => clearInterval(timerId);
    }, [])

    const renderContent = () => {
        if (data) {
            if (error) {
                return (
                    <Alert message={error.toString()} type="error" />
                )
            }
            if ('message' in data ) {
                return (
                    <Alert message={data.message} type="error" />
                )
            }
            return (
                <>
                    <Row justify="space-around" align="middle">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                            <h4 className={styles.header}>Общее</h4>
                            <Descriptions column={1} size={'small'}>
                                <Descriptions.Item label={'ОС'}>
                                    {data.os}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Время работы'}>
                                    {humanizeDuration(data.uptime * 1000, {
                                        language: "ru",
                                        units: ['y', 'mo', 'w', 'd', 'h', 'm'],
                                        round: true
                                    })}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Часовой пояс'}>
                                    {data.timezone}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Дата'}>
                                    {dayjs(data.ts).format('YYYY-MM-DDTHH:mm:ss')}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Время'}>
                                    {dayjs.duration(data.time * 1000).format('HH:mm:ss')}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}  >
                            <h4 className={styles.header}>Процессор</h4>
                            <Descriptions column={1} size={'small'}>
                                <Descriptions.Item label={'Загрузка'}>
                                    {data.cpuLoad.toFixed(2) + '%'}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Ядер'}>
                                    {data.cpuCores}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Модель'}>
                                    {data.cpuModel}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}  >
                            <h4 className={styles.header}>Хранилище</h4>
                            <Descriptions column={1} size={'small'}>
                                <Descriptions.Item label={'Всего'}>
                                    {prettyBytes(data.fsTotal)}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Свободно'}>
                                    {prettyBytes(data.fsFree)}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Занято'}>
                                    {prettyBytes(data.fsUsed)}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}  >
                            <h4 className={styles.header}>Память</h4>
                            <Descriptions column={1} size={'small'}>
                                <Descriptions.Item label={'Всего'}>
                                    {prettyBytes(data.memoryTotal)}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Свободно'}>
                                    {prettyBytes(data.memoryFree)}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Занято'}>
                                    {prettyBytes(data.memoryUsed)}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Row justify="space-around" align="middle" >
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.charts} >
                            <Progress type="circle"
                                      percent={data.cpuLoad}
                                      strokeColor={{ '0%': '#8C7ACC', '100%': '#FF7101' }}
                                      format={(percent) => <>CPU<br/>{percent?.toFixed(1)}%</> }
                            />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.charts} >
                            <Progress type="circle"
                                      percent={data.fsUsed / data.fsTotal * 100}
                                      strokeColor={{ '0%': '#8C7ACC', '100%': '#FF7101' }}
                                      format={(percent) => <>HDD<br/>{percent?.toFixed(1)}%</> }
                            />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.charts} >
                            <Progress type="circle"
                                      percent={data.memoryUsed / data.memoryTotal * 100}
                                      strokeColor={{ '0%': '#8C7ACC', '100%': '#FF7101' }}
                                      format={(percent) => <>RAM<br/>{percent?.toFixed(1)}%</> }
                            />
                        </Col>
                    </Row>
                </>
            )
        }

        return (
            <Spin size={'large'} />
        )
    }

    return (
        <Card title={'Информация о системе'} style={{marginBottom: 24}}>
            {renderContent()}
        </Card>
    )
}

export default SysInfo;
