import React, { useEffect, useState } from "react";
import { Card, List, Empty, Button, Popconfirm, message } from "antd";
import {
    ClockCircleOutlined,
    UserOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { SignInGroup } from "../types";
import { getSignInGroups, deleteSignInRecord } from "../utils/signInService";
import { formatDateTime, formatRelativeTime } from "../utils/dateUtils";

const SignInGroups: React.FC = () => {
    const [groups, setGroups] = useState<SignInGroup[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = () => {
        const groupsData = getSignInGroups();
        // 按开始时间降序排列
        groupsData.sort(
            (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
        );
        setGroups(groupsData);
    };

    const handleDelete = (recordId: string) => {
        setLoading(true);
        try {
            deleteSignInRecord(recordId);
            loadGroups();
            message.success("删除成功");
        } catch (error) {
            message.error("删除失败，请重试");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (groups.length === 0) {
        return (
            <Empty
                description="暂无签到记录"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        );
    }

    return (
        <div className="sign-in-groups">
            <List
                dataSource={groups}
                renderItem={(group) => (
                    <List.Item>
                        <Card
                            title={
                                <div>
                                    <ClockCircleOutlined />
                                    <span style={{ marginLeft: 8 }}>
                                        {formatRelativeTime(group.startTime)}
                                    </span>
                                </div>
                            }
                            style={{ width: "100%" }}
                            bordered
                        >
                            <List
                                dataSource={group.records}
                                renderItem={(record) => (
                                    <List.Item
                                        actions={[
                                            <Popconfirm
                                                title="确定要删除此签到记录吗？"
                                                okText="是"
                                                cancelText="否"
                                                onConfirm={() =>
                                                    handleDelete(record.id)
                                                }
                                            >
                                                <Button
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    size="small"
                                                    loading={loading}
                                                >
                                                    删除
                                                </Button>
                                            </Popconfirm>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<UserOutlined />}
                                            title={record.userName}
                                            description={formatDateTime(
                                                record.time
                                            )}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default SignInGroups;
