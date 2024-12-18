
# 文件管理系统

该项目是一个简单的文件管理系统，支持文件的上传、下载、删除功能。文件会被压缩并支持流式传输。数据库使用 `Prisma` 与 `SQLite` 存储文件的相关信息。

## 目录结构

```tree
/project-root
  ├── prisma/                # Prisma 配置和数据库模型
  ├── public/                # 静态文件目录
  ├── src/                   # 服务器端代码
  ├── package.json           # 项目依赖和启动命令
  ├── README.md              # 项目文档
```

## 依赖安装

在开发和生产环境中安装依赖：

确保你已经安装了 `Node.js` 和 `npm`。

在项目根目录下运行以下命令来安装所有依赖：

```bash
npm ci
```

使用 `npm ci` 来确保安装与 `package-lock.json` 中一致的依赖。

## 数据库配置

项目使用 `Prisma` 和 `SQLite` 存储文件的相关信息。你需要执行以下命令来生成数据库：

生成数据库：

```bash
npx prisma db push
```

`prisma db push` 会根据你的模型同步数据库结构到 `SQLite` 数据库。

如果需要初始化数据库，可以使用以下命令：

```bash
npx prisma migrate dev
```

这个命令会自动创建数据库并应用迁移。

## 启动项目

### 开发环境

启动开发环境服务：

```bash
npm run dev
```

该命令会在开发环境中启动服务器，默认会监听 `http://localhost:3000`。

### 正式环境

启动正式环境服务：

```bash
npm run start
```

该命令会启动生产环境服务器，确保所有生产环境配置已经加载。

## API 说明

### 文件上传

- **请求类型**：`POST`
- **接口路径**：`/api/files/upload`
- **请求体**：`multipart/form-data`
- **参数**：
  - `file`: 要上传的文件。

### 文件下载

- **请求类型**：`GET`
- **接口路径**：`/api/files/download/:id`
- **参数**：
  - `id`: 文件的唯一标识符。

### 删除文件

- **请求类型**：`DELETE`
- **接口路径**：`/api/files/:id`
- **参数**：
  - `id`: 文件的唯一标识符。

## 技术栈

- **Node.js**：作为后台服务框架。
- **Express**：用于处理 API 请求。
- **Prisma**：用于数据库访问和 ORM。
- **SQLite**：作为数据库存储文件数据。
- **zlib**：用于文件的压缩处理。
- **HTML5/JavaScript**：用于前端文件上传和下载的实现。

## 常见问题

Q: **如何修改数据库连接？**

A: 修改 `.env` 文件中的数据库连接字符串，`DATABASE_URL` 环境变量会影响数据库的连接。

Q: **如何处理大量文件上传？**

A: 该系统支持流式传输文件，因此可以处理大文件的上传和下载。在上传时会自动使用流式处理来避免内存溢出。

Q: **如何备份数据库？**

A: 数据库存储在项目根目录下的 `prisma` 文件夹内，默认数据库文件为 `dev.db`。你可以直接拷贝该文件进行备份。

## 贡献

如果你有任何建议或问题，欢迎提交 issue 或 pull request。

感谢你使用本项目！
