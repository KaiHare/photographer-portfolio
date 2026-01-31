# photographer-portfolio
写真ディスプレイ

## Project goal
- Publish fast
- Focus on photo albums and visual presentation
- Static frontend for performance and SEO
- Serverless backend for upload and metadata management

## High-level architecture
- Frontend: Next.js + TypeScript, Pages Router, static build
- Styling: Tailwind CSS
- UI components: shadcn/ui
- Frontend is deployed as static assets to S3 + CloudFront
- Images are stored in S3 and served via CloudFront CDN
- Frontend only consumes APIs and public image URLs (no SSR)

## Core domain concepts
- Album (photo collection)
- Photo (belongs to exactly one album)
- Albums are accessed by slug: /albums/{slug}

## Frontend routes
- / : Home (can be placeholder)
- /albums : Album list
- /albums/[slug] : Album detail with photo grid + lightbox modal
- /admin : Admin area (same Next.js app, placeholder for now)

## Non-goals for MVP
- No comments, likes, search, or pagination
- No image editing in frontend
- No complex authentication logic yet (admin pages can be placeholders)

## Important constraints
- Use Next.js Pages Router, not App Router
- Use TypeScript everywhere
- Keep dependencies minimal
- Code should be readable and maintainable, not over-engineered
- This is a real project intended for production deployment, not a demo

## Build & serve (acceptance)
1) `npm ci`
2) `npm run build`
3) `npm run serve`（默认使用 `npx serve out`，可加 `--listen 5000` 指定端口）

验收 checklist：
- 启动静态服务后打开 `http://localhost:5000/albums/`（或 serve 输出的端口）
- 点击任意相册 slug 页面，内容正常展示（无 /api/mock 请求）
- 点击任意缩略图，弹层正常打开并可关闭
