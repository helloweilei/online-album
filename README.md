# 在线相册

基于 Next.js 16（App Router）的相册管理项目，支持图片上传、预览与分组管理。

## 技术栈

- **Next.js 16** - App Router、Server Components、Server Actions
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 样式
- **本地 JSON 存储** - 相册与图片元数据（`data/`）；图片文件存放在 `public/uploads/`

## 功能

- **相册分组**：创建、编辑、删除相册
- **图片上传**：支持 JPEG / PNG / GIF / WebP，单张最大 10MB，多选上传
- **图片预览**：点击图片全屏预览，支持键盘左右键切换
- **封面设置**：将任意照片设为相册封面
- **删除图片**：单张删除，删除相册时一并删除其下所有图片

## 快速开始

```bash
# 安装依赖（已安装可跳过）
npm install

# 开发
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

## 项目结构

```
src/
├── app/
│   ├── actions/        # Server Actions（相册与图片的增删改）
│   ├── albums/        # 相册列表、相册详情、编辑相册
│   ├── layout.tsx
│   └── page.tsx       # 首页（创建相册 + 相册卡片）
├── components/        # 相册卡片、上传、图片网格、预览 Lightbox 等
├── lib/
│   └── db.ts          # 基于 JSON 文件的数据读写
└── types/
    └── album.ts       # Album、Photo 类型定义
```

## 数据存储

- `data/albums.json` - 相册列表
- `data/photos.json` - 图片元数据
- `public/uploads/` - 上传的图片文件

生产环境建议替换为数据库（如 Prisma + SQLite/PostgreSQL）与对象存储（如 S3、OSS）。

## 脚本

| 命令       | 说明           |
|------------|----------------|
| `npm run dev`   | 开发模式（Turbopack） |
| `npm run build` | 生产构建       |
| `npm run start` | 启动生产服务   |
| `npm run lint`  | 运行 ESLint   |
