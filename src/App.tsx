import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import AppLayout from "./components/AppLayout";
import "./App.css";

function App() {
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{ token: { colorPrimary: "#1677ff" } }}
        >
            <AppLayout />
        </ConfigProvider>
    );
}

export default App;
