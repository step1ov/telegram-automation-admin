import {Col, Layout, Row} from "antd";
import CopyrightText from "@/components/copyright-text";
import React from "react";
import SiteHeader from "@/layouts/site-header";

const { Footer, Content } = Layout;

const LoginLayout = ({ children, title} : { children?: any, title: string}) => {
    return (
        <Layout style={{height:"100vh"}}>
            <SiteHeader title={title} />
            <Content>
                <Row justify="space-around" align="middle" style={{height: "100%"}}>
                    <Col xs={23} sm={16} md={12} lg={10} xl={7} >
                        {children}
                    </Col>
                </Row>
            </Content>
            <Footer><CopyrightText/></Footer>
        </Layout>
    )
}

export default LoginLayout;
