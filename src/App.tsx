import React, { useEffect } from "react";
import { ConfigProvider, App as AntApp, message } from "antd";
import zhCN from "antd/locale/zh_CN";
import AppLayout from "./components/AppLayout";
import "./App.css";
import "dayjs/locale/zh-cn";

const App: React.FC = () => {
    useEffect(() => {
        // 配置message的全局样式
        message.config({
            maxCount: 3,
            duration: 2,
        });
    }, []);

    return (
        <ConfigProvider
            locale={zhCN}
            theme={{ token: { colorPrimary: "#1677ff" } }}
        >
            <AntApp>
                <AppLayout />
            </AntApp>
        </ConfigProvider>
    );
};

export default App;
