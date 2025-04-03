import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

// 配置dayjs
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

/**
 * 格式化日期时间显示
 * @param dateString ISO 格式的日期字符串
 * @returns 格式化后的日期时间字符串
 */
export const formatDateTime = (dateString: string | null): string => {
    if (!dateString) return "未签到";
    return dayjs(dateString).format("YYYY-MM-DD HH:mm");
};

/**
 * 格式化相对时间
 * @param dateString ISO 格式的日期字符串
 * @returns 相对时间字符串
 */
export const formatRelativeTime = (dateString: string): string => {
    return dayjs(dateString).fromNow();
};

/**
 * 计算两个时间点之间的分钟差
 * @param dateString1 第一个时间点
 * @param dateString2 第二个时间点
 * @returns 分钟差
 */
export const getMinutesDiff = (
    dateString1: string,
    dateString2: string
): number => {
    return dayjs(dateString1).diff(dayjs(dateString2), "minute");
};

/**
 * 检查是否应该创建新分组（超过10分钟）
 * @param lastSignInTime 上次签到时间
 * @returns 是否应该创建新分组
 */
export const shouldCreateNewGroup = (
    lastSignInTime: string | null
): boolean => {
    if (!lastSignInTime) return true;
    const minutesDiff = dayjs().diff(dayjs(lastSignInTime), "minute");
    return minutesDiff > 10;
};
