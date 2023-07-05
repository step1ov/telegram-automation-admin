import React, {ReactNode} from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import useUser from "@/hooks/users/use-user";
import sharedMenuItems from "@/data/menu/shared-menu-items";
import TopMenuLayout from "@/layouts/top-menu-layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {BreadcrumbProps} from "antd";
import combineBreadcrumbs from "@/utils/layout/combine-breadcrumbs";
import userMenuItems from "@/data/menu/user-menu-items";

export interface UserLayoutProps {
    children?: any,
    userId: string,
    title?: string,
    subTitle?: string | ReactNode,
    breadcrumb?: BreadcrumbProps
}

const UserLayout = ({children, userId, title, subTitle, breadcrumb}: UserLayoutProps) => {
    const userData = useUser(userId);
    const id = userData.data && 'id' in userData.data ? userData.data?.id : '';
    const displayName = userData.data && 'username' in userData.data ?
        '@' + userData.data.username : `Пользователь ${id}`;

    const items = [
        {
            key: `/dashboard/users/${userId}`,
            icon: <FontAwesomeIcon icon={faUser}/>,
            label: 'Основное',
        },
        ...sharedMenuItems(`/dashboard/users/${userId}`),
        ...userMenuItems(`/dashboard/users/${userId}`)
    ]

    const breadcrumbBase = {
        routes: [
            {
                path: id,
                breadcrumbName: displayName,
            }
        ]
    }

    const combinedBreadcrumbs = combineBreadcrumbs(breadcrumbBase, breadcrumb);

    return (
        <DashboardLayout title={displayName + ': ' + title} subTitle={subTitle} breadcrumb={combinedBreadcrumbs}>
            <TopMenuLayout items={items}>
                {children}
            </TopMenuLayout>
        </DashboardLayout>
    )
}

UserLayout.defaultProps = {
    title: 'Основное'
}

export default UserLayout;
