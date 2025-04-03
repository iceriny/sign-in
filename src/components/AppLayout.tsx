import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import SignInList from "./SignInList";
import SignInGroups from "./SignInGroups";

const { Header, Content } = Layout;
const { Title } = Typography;

const AppLayout: React.FC = () => {
    const [selectedKey, setSelectedKey] = useState("1");

    const handleMenuClick = (key: string) => {
        setSelectedKey(key);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    background: "#1677ff",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Title level={4} style={{ color: "white", margin: 0 }}>
                        实时签到系统
                    </Title>
                </div>
            </Header>

            <Content style={{ padding: "24px 16px", overflow: "auto" }}>
                {selectedKey === "1" ? <SignInList /> : <SignInGroups />}
            </Content>

            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    borderTop: "1px solid #f0f0f0",
                    background: "#fff",
                }}
            >
                <Menu
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    style={{ display: "flex", justifyContent: "center" }}
                    items={[
                        {
                            key: "1",
                            icon: <UserOutlined />,
                            label: "签到列表",
                            onClick: () => handleMenuClick("1"),
                        },
                        {
                            key: "2",
                            icon: <AppstoreOutlined />,
                            label: "签到记录",
                            onClick: () => handleMenuClick("2"),
                        },
                    ]}
                />
            </div>
        </Layout>
    );
};

export default AppLayout;
