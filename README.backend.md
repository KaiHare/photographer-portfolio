# Admin Backend (MVP)

技术栈：Next.js (App Router) + TypeScript + Prisma + PostgreSQL + S3 (+ sharp)

## 环境变量
参考 `.env.example`：
```
DATABASE_URL=postgresql://user:password@localhost:5432/photographer
ADMIN_TOKEN=change-me
S3_REGION=us-east-1
S3_BUCKET=your-bucket-name
# 可选
# S3_PUBLIC_URL_PREFIX=https://cdn.example.com
# S3_ENDPOINT=https://s3.amazonaws.com
```

## 初始化
```bash
pnpm install # 或 npm install
pnpm prisma migrate dev --name init
pnpm dev
```

## 认证
所有 `/admin/*` API 需 Header：`Authorization: Bearer $ADMIN_TOKEN`

## API 速览
- 管理：
  - `GET/POST /admin/projects`
  - `GET/PATCH/DELETE /admin/projects/:id`
  - `POST /admin/projects/:id/publish`（{published:boolean}）
  - `GET/POST /admin/projects/:id/photos`（POST multipart file）
  - `PATCH /admin/projects/:id/photos/reorder`（{orders:[{photoId,order}] }）
  - `PATCH/DELETE /admin/photos/:photoId`
- 前台只读：
  - `GET /api/albums`（仅 published，photos 为空数组）
  - `GET /api/albums/:slug`（含已发布且未隐藏的 photos）

## 上传流程
1) `POST /admin/projects/:id/photos` form-data: `file` (+ 可选 title/caption/location/takenAt/year)
2) 后端上传原图到 S3，并生成两种尺寸：display(1600) / thumb(400)，均 public-read
3) 写入 Photo 记录（order 自动递增）

## Postman / curl 示例
```bash
# 创建项目
curl -X POST http://localhost:3000/admin/projects \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Roll","year":2024,"cover":{"src":"https://example.com/cover.jpg"}, "published":false}'

# 发布项目
curl -X POST http://localhost:3000/admin/projects/{id}/publish \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"published":true}'

# 上传照片
curl -X POST http://localhost:3000/admin/projects/{id}/photos \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -F "file=@/path/to/photo.jpg" \
  -F "title=Sunrise" -F "caption=Calm" -F "takenAt=2024-05-17"

# 重排
curl -X PATCH http://localhost:3000/admin/projects/{id}/photos/reorder \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"orders":[{"photoId":"...","order":1},{"photoId":"...","order":2}]}'

# 前台数据
curl http://localhost:3000/api/albums
curl http://localhost:3000/api/albums/city-afterglow
```

## 开发顺序（已实现）
A. Prisma schema + migration  
B. Project CRUD + publish  
C. Photo upload（S3+sharp）  
D. reorder 接口  
E. public API 两个 endpoint
