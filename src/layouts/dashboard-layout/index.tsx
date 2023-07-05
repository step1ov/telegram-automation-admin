import {BreadcrumbProps, Button, Dropdown, Image, Layout, Menu, MenuProps} from "antd";
import React, {ReactNode, useState} from "react";
import {useRouter} from "next/router";
import styles from "./styles.module.scss";
import Link from "next/link";
import useUserContext from "@/context/user/use-user-context";
import CopyrightText from "@/components/copyright-text";
import {UserOutlined, SettingOutlined, LogoutOutlined} from "@ant-design/icons";
import {PageHeader} from "@ant-design/pro-layout";
import SiteHeader from "@/layouts/site-header";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers, faHome, faBell} from '@fortawesome/free-solid-svg-icons'
import sharedMenuItems from "@/data/menu/shared-menu-items";
import {ItemType} from "antd/es/menu/hooks/useItems";
import combineBreadcrumbs from "@/utils/layout/combine-breadcrumbs";
import {Route} from "antd/es/breadcrumb/Breadcrumb";

const {Content, Footer, Sider} = Layout;

export interface DashboardLayoutProps {
    children?: any,
    title: string,
    subTitle?: string | ReactNode,
    breadcrumb?: BreadcrumbProps
}

const breadcrumbItemRender = (route: Route, params: any, routes: Array<Route>, paths: Array<string>): ReactNode => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link href={'/' + paths.join('/')}>{route.breadcrumbName}</Link>
    );
}

const DashboardLayout = ({children, title, subTitle, breadcrumb}: DashboardLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const userContext = useUserContext()
    const {user} = userContext.data;
    const router = useRouter();

    const onLogout = () => {
        userContext.logout();
    }

    const breadcrumbBase = {
        itemRender: breadcrumbItemRender,
        routes: [
            {
                path: 'dashboard',
                breadcrumbName: 'Панель администрирования',
            }
        ]
    }

    const combinedBreadcrumbs = combineBreadcrumbs(breadcrumbBase, breadcrumb);

    const itemsTop: MenuProps['items'] = [
        {
            key: "1",
            label: <div className={styles.displayName}>{user?.displayName}</div>,
            disabled: true
        },
        {
            key: "2",
            label: <Link href={"/dashboard/profile"}>Профиль</Link>,
            icon: <UserOutlined/>
        },
        {
            key: "3",
            label: <Link href={"/dashboard/settings"}>Настройки</Link>,
            icon: <SettingOutlined/>
        },
        {
            type: 'divider'
        },
        {
            key: "-1",
            label: 'Выход',
            icon: <LogoutOutlined/>,
            onClick: onLogout
        }
    ];

    const handleMenuItemClick = (e: any) => {
        router.push(e.key);
    }

    const itemsSide: MenuProps['items'] = [
        {
            key: '/dashboard',
            icon: <FontAwesomeIcon icon={faHome}/>,
            label: 'Главная',
        },
        {
            key: '/dashboard/users',
            icon: <FontAwesomeIcon icon={faUsers}/>,
            label: 'Пользователи',
        },
        ...sharedMenuItems('/dashboard') as ItemType[],
    ]

    return (
        <Layout style={{minHeight: '100vh'}}>
            <SiteHeader title={title}/>
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo-container">
                    <Link href={"/dashboard"} title={'На главную'}>
                        <Image preview={false} className={styles.logo} alt="Doninn CRM" src={"/logo.jpg"}/>
                    </Link>
                </div>
                <Menu
                    onClick={handleMenuItemClick}
                    defaultSelectedKeys={[router.pathname]}
                    defaultOpenKeys={['collections', 'diary', 'chat']}
                    mode="inline"
                    style={{borderRight: 0}}
                    items={itemsSide}
                />
            </Sider>
            <Layout className="site-layout">
                <PageHeader
                    title={title}
                    className="site-page-header"
                    subTitle={subTitle}
                    breadcrumb={combinedBreadcrumbs.routes.length > 1 ? combinedBreadcrumbs : undefined}
                    extra={[
                        <Dropdown key={0} className={styles.dropDownRight} menu={{items: itemsTop}} trigger={['click']}>
                            <Button icon={<UserOutlined/>} shape={'circle'}/>
                        </Dropdown>
                    ]}
                />
                <Content className={styles.content}>
                    {children}
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <CopyrightText/>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default DashboardLayout;
