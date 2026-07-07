# IAM Invoice Demo Backend

Backend Node.js thuần + TypeScript cho dự án Invoice Demo.

## Công nghệ đang dùng

- Node.js
- TypeScript
- Prisma ORM
- MySQL

## Cài dependencies

```bash
npm install
```

## Cấu hình môi trường

Project đã có file `.env.example`. Tạo file `.env` bằng lệnh:

```bash
cp .env.example .env
```

Cấu hình mặc định đang dùng:

```env
PORT=3000
DATABASE_URL="mysql://admin:123456789@localhost:3306/iam_invoice_demo"
```

Format kết nối MySQL:

```text
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

## Chạy MySQL bằng Docker

Chạy container MySQL local với user `admin`, mật khẩu `123456789`, database `iam_invoice_demo`:

```bash
docker run --name iam-invoice-mysql \
  -e MYSQL_ROOT_PASSWORD=123456789 \
  -e MYSQL_DATABASE=iam_invoice_demo \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=123456789 \
  -p 3306:3306 \
  -d mysql:8.4
```

Kiểm tra container:

```bash
docker ps
```

Nếu muốn dừng MySQL:

```bash
docker stop iam-invoice-mysql
```

Nếu muốn chạy lại container đã tạo:

```bash
docker start iam-invoice-mysql
```

Nếu muốn xóa container để tạo lại từ đầu:

```bash
docker rm -f iam-invoice-mysql
```

## Generate Prisma Client

Sau khi cài dependencies hoặc thay đổi `prisma/schema.prisma`, chạy:

```bash
npm run prisma:generate
```

## Chạy migration Prisma

Sau khi MySQL Docker đã chạy, tạo bảng trong database theo schema Prisma:

```bash
npm run prisma:migrate -- --name init
```

Lệnh này sẽ tạo migration, tạo bảng và generate Prisma Client.

## Chạy project ở môi trường dev

```bash
npm run dev
```

Server mặc định chạy tại:

```text
http://localhost:3000
```

Nếu muốn đổi port, sửa biến `PORT` trong `.env`.

## Build project

```bash
npm run build
```

Code TypeScript sẽ được build ra thư mục `dist/`.

## Chạy bản build production/local

Sau khi build:

```bash
npm start
```

## Mở Prisma Studio

Prisma Studio giúp xem và chỉnh data trong database bằng giao diện web:

```bash
npm run prisma:studio
```

## Scripts hiện có

```bash
npm run dev              # Chạy dev bằng tsx watch
npm run build            # Build TypeScript sang dist/
npm start                # Chạy file đã build
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Chạy Prisma migration
npm run prisma:studio    # Mở Prisma Studio
```

## Cấu trúc thư mục chính

```text
src/
  config/
    database.ts
  controllers/
  middlewares/
  routes/
  services/
  utils/
  index.ts
prisma/
  schema.prisma
.env.example
package.json
tsconfig.json
```
