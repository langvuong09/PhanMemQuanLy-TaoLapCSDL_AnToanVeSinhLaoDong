# --- Stage 1: Build ---
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
# SỬA TẠI ĐÂY: Dùng npm install để tự cập nhật các gói bổ trợ cho Linux Alpine
RUN npm install

COPY . .
RUN npm run build

# --- Stage 2: Runner ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
# SỬA TẠI ĐÂY: Dùng npm install để tránh xung đột lockfile nền tảng
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/sql ./dist/src/sql
COPY --from=builder /app/src/templates /app/src/templates

EXPOSE 3010

# SỬA TẠI ĐÂY: Chạy trực tiếp, không gọi tsconfig-paths kẻo bị crash do thiếu devDependencies
CMD ["node", "dist/src/main.js"]