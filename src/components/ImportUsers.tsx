import React, { useState } from "react";
import { Modal, Input, Button, App } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { importUsers } from "../utils/signInService";

const { TextArea } = Input;

interface ImportUsersProps {
    onImportSuccess: () => void;
}

const ImportUsers: React.FC<ImportUsersProps> = ({ onImportSuccess }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [namesText, setNamesText] = useState("");
    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNamesText("");
    };

    const handleImport = () => {
        if (!namesText.trim()) {
            message.warning("请输入姓名列表");
            return;
        }

        setLoading(true);
        try {
            const newUsers = importUsers(namesText);
            if (newUsers.length > 0) {
                message.success(`成功导入 ${newUsers.length} 名用户`);
                onImportSuccess();
                setIsModalVisible(false);
                setNamesText("");
            } else {
                message.info("没有导入新用户，可能是名单中的用户已存在");
            }
        } catch (error) {
            message.error("导入失败，请重试");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={showModal}
                style={{ marginBottom: 16 }}
            >
                导入名单
            </Button>

            <Modal
                title="导入名单"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button
                        key="import"
                        type="primary"
                        loading={loading}
                        onClick={handleImport}
                    >
                        导入
                    </Button>,
                ]}
            >
                <p>请输入用户名单，用逗号（中英文均可）分隔：</p>
                <TextArea
                    rows={6}
                    value={namesText}
                    onChange={(e) => setNamesText(e.target.value)}
                    placeholder="例如：张三,李四,王五"
                    style={{ marginTop: 16, marginBottom: 16 }}
                />
                <p style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                    说明：导入的名单将添加到现有名单中，已存在的名字将被忽略
                </p>
            </Modal>
        </>
    );
};

export default ImportUsers;
