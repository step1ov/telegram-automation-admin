import {Col, Layout, Row, Spin} from "antd";
import React from "react";

const { Content } = Layout;

const LoadingLayout = () => {
    return (
        <Layout style={{height:"100vh"}}>
            <Content>
                <Row justify="center" align="middle" style={{height: "100%"}}>
                    <Col >
                        <Spin size={'large'} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default LoadingLayout;
