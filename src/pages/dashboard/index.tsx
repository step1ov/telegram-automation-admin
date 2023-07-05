import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import {Col, Row} from "antd";
import SysInfo from "@/components/sys-info";

const Dashboard = () => {
    return (
        <DashboardLayout title={"Панель администрирования"}>
            <Row gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}>
                <Col lg={12} md={24}>
                    <SysInfo/>
                </Col>
                <Col lg={12} md={24}>

                </Col>
            </Row>
        </DashboardLayout>
    )
}

export default Dashboard;
