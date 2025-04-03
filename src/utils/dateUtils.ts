/**
 * 格式化日期时间显示
 * @param dateString ISO 格式的日期字符串
 * @returns 格式化后的日期时间字符串
 */
export const formatDateTime = (dateString: string | null): string => {
    if (!dateString) return "未签到";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * 格式化相对时间
 * @param dateString ISO 格式的日期字符串
 * @returns 相对时间字符串
 */
export const formatRelativeTime = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();

    // 转换为分钟
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) {
        return "刚刚";
    } else if (diffMinutes < 60) {
        return `${diffMinutes}分钟前`;
    } else if (diffMinutes < 60 * 24) {
        return `${Math.floor(diffMinutes / 60)}小时前`;
    } else if (diffMinutes < 60 * 24 * 7) {
        return `${Math.floor(diffMinutes / (60 * 24))}天前`;
    } else {
        return formatDateTime(dateString);
    }
};
