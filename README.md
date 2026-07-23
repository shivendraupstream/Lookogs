# Lookogs
This is Lookogs, An application that helps you see and visualize the logs to debug better. 
# Lookogs

**Lookogs** is a self-hostable log management and APM platform, inspired by AppSignal.

It lets external applications send logs over HTTP, stores them securely in PostgreSQL, and exposes APIs to retrieve, search, and filter them — all under your own infrastructure.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Clone the Repository](#clone-the-repository)
  - [Environment Variables](#environment-variables)
  - [Install Dependencies](#install-dependencies)
  - [Start Docker Services](#start-docker-services)
  - [Database Setup](#database-setup)
  - [Seed the Database (Optional)](#seed-the-database-optional)
  - [Run the Backend](#run-the-backend)
  - [Verify the Backend](#verify-the-backend)
- [pgAdmin Access](#pgadmin-access)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [Roadmap](#roadmap)
- [Development Commands](#development-commands)
- [Stopping the Project](#stopping-the-project)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

**Currently shipped (MVP):**

| Category | Capability |
|---|---|
| Applications | Create and list applications |
| Sources | Create and list log sources |
| Auth | API key authentication for ingestion |
| Ingestion | JSON log ingestion, single and bulk |
| Retrieval | Filtered log queries with cursor pagination |
| Retrieval | Fetch a single log by ID |
| Storage | PostgreSQL persistence |
| Infra | Full Docker development environment |

---

## Tech Stack

**Backend**
- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Redis *(wired up, reserved for upcoming features)*

**Infrastructure**
- Docker
- Docker Compose
- pgAdmin

---

## Project Structure

```
Lookogs/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── dto/
│   │   ├── plugins/
│   │   └── ...
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Getting Started

### Requirements

Make sure the following are installed before you begin:

- Node.js 22+
- npm
- Docker Desktop
- Git

### Clone the Repository

```bash
git clone <repository-url>
cd Lookogs
```

### Environment Variables

Copy the example env file and adjust values as needed.

```bash
cp .env.example .env
```

> On Windows, duplicate `.env.example` and rename the copy to `.env`.

```env
POSTGRES_USER=lookogs
POSTGRES_PASSWORD=password
POSTGRES_DB=lookogs

DATABASE_URL=postgresql://lookogs:password@localhost:5432/lookogs
```

### Install Dependencies

```bash
cd backend
npm install
```

### Start Docker Services

From the project root:

```bash
docker compose up -d
```

This starts:
- PostgreSQL
- Redis
- pgAdmin

Confirm everything is running:

```bash
docker ps
```

### Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate deploy
```

For local development, you can use the interactive flow instead:

```bash
npx prisma migrate dev
```

### Seed the Database (Optional)

```bash
npm run seed
```

### Run the Backend

From the `backend` directory:

```bash
npm run dev
```

You should see:

```
🚀 Server running on http://localhost:3000
```

### Verify the Backend

```
GET http://localhost:3000/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

---

## pgAdmin Access

Open pgAdmin at:

```
http://localhost:5050
```

Log in with the credentials configured in your Docker environment, then register the PostgreSQL server with:

| Field | Value |
|---|---|
| Host | `postgres` |
| Port | `5432` |
| Database | `lookogs` |
| Username | `lookogs` |
| Password | `password` |

---

## API Reference

### Applications

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/apps` | Create an application |
| `GET` | `/api/v1/apps` | List applications |

### Sources

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/sources` | Create a source |
| `GET` | `/api/v1/sources` | List sources |

### Log Ingestion

```
POST /api/v1/ingest
```

Requires an `x-api-key` header. Supports JSON payloads (single or bulk).

### Retrieve Logs

```
GET /api/v1/logs
```

**Query Parameters**

| Parameter | Required | Description |
|---|---|---|
| `appId` | Yes | Target application ID |
| `severity` | No | Filter by log severity |
| `sourceId` | No | Filter by source |
| `search` | No | Full-text search |
| `startTime` | No | Range filter, start |
| `endTime` | No | Range filter, end |
| `limit` | No | Max results per page |

**Example**

```
GET /api/v1/logs?appId=<APP_ID>&severity=ERROR
```

### Retrieve a Single Log

```
GET /api/v1/logs/:id?appId=<APP_ID>
```

---

## Architecture

Lookogs follows a layered backend architecture:

```
HTTP Request
     │
     ▼
  Routes            → expose HTTP endpoints
     │
     ▼
 Controllers        → handle requests, shape responses
     │
     ▼
  Services          → business logic
     │
     ▼
Repositories        → database access
     │
     ▼
 Prisma ORM          → maps models to SQL
     │
     ▼
 PostgreSQL
```

---

## Roadmap

**Implemented**
- [x] Docker development environment
- [x] PostgreSQL + Prisma ORM
- [x] Application & source management
- [x] API key authentication
- [x] JSON log ingestion (single + bulk)
- [x] Filtered, paginated log retrieval
- [x] DTO responses & global error handling

**Planned**
- [ ] NDJSON ingestion
- [ ] Plain-text log ingestion
- [ ] logfmt support
- [ ] Retention jobs
- [ ] Swagger / OpenAPI docs
- [ ] User authentication & teams
- [ ] Alerts
- [ ] Charts & dashboards
- [ ] Live log streaming
- [ ] ClickHouse / OpenSearch backend option

---

## Development Commands

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Run development server |
| `npx prisma generate` | Regenerate Prisma client |
| `npx prisma migrate dev --name <name>` | Create a new migration |
| `npx prisma migrate deploy` | Deploy pending migrations |
| `npx prisma studio` | Open Prisma Studio |

---

## Stopping the Project

Stop containers, keep data:

```bash
docker compose down
```

Stop containers and remove volumes (deletes data):

```bash
docker compose down -v
```

---

## Troubleshooting

**Docker isn't running**
Start Docker Desktop, then re-run:
```bash
docker compose up
```

**Database connection failed**
Check that the Postgres container is up:
```bash
docker ps
```

**Prisma Client is out of date**
```bash
npx prisma generate
```

**Migration issues**
Reset the development database (⚠️ deletes all data):
```bash
npx prisma migrate reset
```

---

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
2. Commit your changes:
   ```bash
   git commit -m "feat: add feature"
   ```
3. Push the branch:
   ```bash
   git push origin feature/my-feature
   ```
4. Open a Pull Request.

---

## License

This project is intended for educational and portfolio purposes.