import { User, SignInRecord, SignInGroup } from "../types";

// 使用本地存储模拟数据库
const LOCAL_STORAGE_KEYS = {
    USERS: "sign-in-users",
    RECORDS: "sign-in-records",
    GROUPS: "sign-in-groups",
    LAST_SIGN_IN_TIME: "last-global-sign-in-time",
};

// 初始化一些测试数据
// 注：本应用使用localStorage存储数据，不依赖第三方Cookie，
// 因此不受Chrome禁用第三方Cookie政策的影响
const initializeTestData = () => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.USERS)) {
        const users: User[] = [];
        localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.RECORDS)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.RECORDS, JSON.stringify([]));
    }

    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.GROUPS)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.GROUPS, JSON.stringify([]));
    }
};

// 获取所有用户
export const getUsers = (): User[] => {
    initializeTestData();
    const users = localStorage.getItem(LOCAL_STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
};

// 获取所有签到记录
export const getSignInRecords = (): SignInRecord[] => {
    const records = localStorage.getItem(LOCAL_STORAGE_KEYS.RECORDS);
    return records ? JSON.parse(records) : [];
};

// 获取所有签到分组
export const getSignInGroups = (): SignInGroup[] => {
    const groups = localStorage.getItem(LOCAL_STORAGE_KEYS.GROUPS);
    return groups ? JSON.parse(groups) : [];
};

// 记录新的签到
export const signIn = (userId: string): void => {
    const users = getUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) return;

    const currentTime = new Date().toISOString();
    const newRecord: SignInRecord = {
        id: Date.now().toString(),
        userId,
        userName: user.name,
        time: currentTime,
    };

    // 更新用户最后签到时间
    const updatedUsers = users.map((u) =>
        u.id === userId ? { ...u, lastSignInTime: currentTime } : u
    );
    localStorage.setItem(
        LOCAL_STORAGE_KEYS.USERS,
        JSON.stringify(updatedUsers)
    );

    // 保存签到记录
    const records = getSignInRecords();
    records.push(newRecord);
    localStorage.setItem(LOCAL_STORAGE_KEYS.RECORDS, JSON.stringify(records));

    // 检查是否需要创建新的分组
    const lastGlobalSignInTime = localStorage.getItem(
        LOCAL_STORAGE_KEYS.LAST_SIGN_IN_TIME
    );
    const currentTimeMs = new Date(currentTime).getTime();
    const lastTimeMs = lastGlobalSignInTime
        ? new Date(lastGlobalSignInTime).getTime()
        : 0;
    const timeDifferenceMinutes = (currentTimeMs - lastTimeMs) / (1000 * 60);

    let groups = getSignInGroups();

    // 如果超过10分钟，创建新分组
    if (!lastGlobalSignInTime || timeDifferenceMinutes > 10) {
        const newGroup: SignInGroup = {
            id: Date.now().toString(),
            startTime: currentTime,
            records: [newRecord],
        };
        groups.push(newGroup);
    } else {
        // 否则添加到最后一个分组
        if (groups.length > 0) {
            const lastGroup = groups[groups.length - 1];
            lastGroup.records.push(newRecord);
            groups = [...groups.slice(0, -1), lastGroup];
        } else {
            // 如果没有分组，创建第一个
            const newGroup: SignInGroup = {
                id: Date.now().toString(),
                startTime: currentTime,
                records: [newRecord],
            };
            groups.push(newGroup);
        }
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.GROUPS, JSON.stringify(groups));
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_SIGN_IN_TIME, currentTime);
};

// 批量添加用户
export const importUsers = (namesText: string): User[] => {
    // 分割文本，支持中英文逗号
    const names = namesText
        .split(/[,，]/)
        .map((name) => name.trim())
        .filter((name) => name);

    // 获取现有用户
    const existingUsers = getUsers();
    const existingNames = new Set(existingUsers.map((user) => user.name));

    // 创建新用户列表
    const newUsers: User[] = [];

    // 为每个新名字创建用户
    for (const name of names) {
        if (!existingNames.has(name)) {
            const newUser: User = {
                id: Date.now() + Math.random().toString(36).substring(2, 9),
                name,
                lastSignInTime: null,
            };
            newUsers.push(newUser);
            existingNames.add(name);
        }
    }

    // 更新存储
    if (newUsers.length > 0) {
        const updatedUsers = [...existingUsers, ...newUsers];
        localStorage.setItem(
            LOCAL_STORAGE_KEYS.USERS,
            JSON.stringify(updatedUsers)
        );
    }

    return newUsers;
};

// 删除签到记录
export const deleteSignInRecord = (recordId: string): void => {
    // 从记录中删除
    const records = getSignInRecords();
    const updatedRecords = records.filter((record) => record.id !== recordId);
    localStorage.setItem(
        LOCAL_STORAGE_KEYS.RECORDS,
        JSON.stringify(updatedRecords)
    );

    // 从分组中删除
    const groups = getSignInGroups();
    const updatedGroups = groups
        .map((group) => {
            const updatedGroupRecords = group.records.filter(
                (record) => record.id !== recordId
            );
            return {
                ...group,
                records: updatedGroupRecords,
            };
        })
        .filter((group) => group.records.length > 0); // 移除没有记录的组

    localStorage.setItem(
        LOCAL_STORAGE_KEYS.GROUPS,
        JSON.stringify(updatedGroups)
    );
};
