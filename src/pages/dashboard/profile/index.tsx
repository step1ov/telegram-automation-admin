import {Col, Row} from "antd";
import ProfileUserInfoCard from "../../../components/profile/profile-user-info-card";
import ProfilePasswordCard from "../../../components/profile/profile-password-card";
import ProfileExtraInfoCard from "../../../components/profile/profile-extra-info-card";
import useUserContext from "@/context/user/use-user-context";
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";

const ProfilePage = () => {
    const userContext = useUserContext();
    const { user } = userContext.data;

    return (
        <DashboardLayout title={"Профиль: " + user?.displayName}
                         breadcrumb={{ routes: [
                                 { path: "profile", breadcrumbName: "Профиль" },
                             ]}}
        >
            <Row gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}>
                <Col lg={12} md={24}>
                    <ProfileUserInfoCard/>
                </Col>
                <Col lg={12} md={24}>
                    <ProfilePasswordCard />
                    <ProfileExtraInfoCard/>
                </Col>
            </Row>
        </DashboardLayout>
    )
}

export default ProfilePage;
