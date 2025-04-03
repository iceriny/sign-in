# 实时签到系统

一个针对移动端优化的实时签到 Web 应用。

## 功能特点

-   实时签到记录
-   按时间自动分组（超过 10 分钟自动创建新分组）
-   移动端友好界面
-   支持批量导入用户名单（通过逗号分隔）
-   支持删除签到记录
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

## 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署到 GitHub Pages：

1. 在 GitHub 上创建仓库并推送代码
2. 启用 GitHub Pages（设置 -> Pages -> 选择 GitHub Actions 作为构建和部署源）
3. 添加自定义域名（如果需要）

项目每次推送到 main 分支后都会自动构建并部署到 GitHub Pages。

### 自定义域名设置

当前配置使用的自定义域名为：`sitemp.misssu.cn`

如需更改：

1. 修改`public/CNAME`文件中的域名
2. 在域名提供商处添加以下 DNS 记录：
    - 类型: CNAME
    - 名称: sitemp（或你的子域名）
    - 值: `<你的GitHub用户名>.github.io`

## 项目结构

```
src/
  ├── components/      # 组件
  │   ├── AppLayout.tsx    # 应用布局
  │   ├── SignInList.tsx   # 签到列表
  │   ├── ImportUsers.tsx  # 导入用户
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
