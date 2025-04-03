import React, { useEffect, useState } from "react";
import { List, Button, Typography, App } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { User } from "../types";
import { getUsers, signIn } from "../utils/signInService";
import { formatDateTime, shouldCreateNewGroup } from "../utils/dateUtils";
import ImportUsers from "./ImportUsers";

const { Text } = Typography;

const SignInList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        const usersData = getUsers();
        setUsers(usersData);
    };

    const handleSignIn = (userId: string) => {
        setLoading(true);
        try {
            signIn(userId);
            loadUsers();
            message.success("签到成功");
        } catch (error) {
            message.error("签到失败，请重试");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sign-in-list">
            <ImportUsers onImportSuccess={loadUsers} />

            <List
                itemLayout="horizontal"
                dataSource={users}
                renderItem={(user) => (
                    <List.Item
                        actions={[
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={() => handleSignIn(user.id)}
                                loading={loading}
                            >
                                签到
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={<span>{user.name}</span>}
                            description={
                                <Text
                                    type={
                                        user.lastSignInTime &&
                                        shouldCreateNewGroup(
                                            user.lastSignInTime
                                        )
                                            ? "danger"
                                            : "secondary"
                                    }
                                >
                                    最近签到:{" "}
                                    {formatDateTime(user.lastSignInTime)}
                                </Text>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default SignInList;
