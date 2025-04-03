# 实时签到系统

一个针对移动端优化的实时签到 Web 应用。

## 功能特点

-   实时签到记录
-   按时间自动分组
-   移动端友好界面
-   支持查看签到历史记录

## 技术栈

-   React 18
-   TypeScript
-   Vite
-   Ant Design (移动端优化)

## 开发环境设置

1. 克隆仓库

```bash
git clone <仓库地址>
cd sign-in
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
  ├── components/      # 组件
  │   ├── AppLayout.tsx    # 应用布局
  │   ├── SignInList.tsx   # 签到列表
  │   └── SignInGroups.tsx # 签到分组
  ├── utils/           # 工具函数
  │   ├── signInService.ts # 签到服务
  │   └── dateUtils.ts     # 日期工具
  ├── types.ts         # 类型定义
  ├── App.tsx          # 根组件
  └── main.tsx         # 入口文件
```

## 数据模型

-   用户数据
-   签到记录
-   签到分组（超过 10 分钟间隔自动创建新分组）

## 许可证

MIT
