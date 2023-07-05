import React from "react";
import {useRouter} from "next/router";
import UserLayout from "@/layouts/user-layout";
import useTelegramUser from "@/hooks/telegram/use-telegram-user";
import TelegramUser from "@/components/telegram/telegram-user";
import {Col, Row} from "antd";
import TelegramContacts from "@/components/telegram/telegram-contacts";
import TelegramChannels from "@/components/telegram/telegram-channels";
import Telegram2faPassword from "@/components/telegram/telegram-2fa-password";

const UserActionsPage = () => {
    const router = useRouter();
    const userId = router.query.userId as string;
    const { error, data, isLoading, mutate } = useTelegramUser(userId);
    return (
        <UserLayout userId={userId}
                    title={"Telegram"}
                    breadcrumb={{ routes: [
                            { path: "telegram", breadcrumbName: "Telegram" }
                        ]}}
        >
            <Row gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}>
                <Col lg={12} md={24}>
                    <TelegramUser userData={data} mutate={mutate} userId={userId} />
                    <TelegramChannels userData={data} userId={userId}/>
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <TelegramContacts userData={data} userId={userId}/>
                    {/*<Telegram2faPassword userId={userId} />*/}
                </Col>
            </Row>
        </UserLayout>
    )
}

export default UserActionsPage;
