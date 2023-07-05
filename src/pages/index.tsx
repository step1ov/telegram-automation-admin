import Link from "next/link";
import {Button, Result, Spin} from "antd";
import React from "react";
import useUserContext from "@/context/user/use-user-context";
import {SmileOutlined} from "@ant-design/icons";

export default function Home() {
    const userContext = useUserContext()
    return (
        userContext.isLoading ?
            <Spin size="large" /> :
            <Result title="Добро пожаловать в панель администрирования"
                    icon={<SmileOutlined />}
                    extra={<Link href="/login"><Button type="primary">На страницу входа</Button></Link>}
            />
    )
}
