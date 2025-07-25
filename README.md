# Romania Endpoints Backend

A NestJS backend application with Prisma ORM and MySQL database integration.

## Features

- ✅ NestJS framework
- ✅ Prisma ORM for database operations
- ✅ MySQL database integration
- ✅ Health check endpoint with uptime and database status
- ✅ TypeScript support
- ✅ Environment configuration

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v18 or higher recommended)
- npm or yarn
- MySQL server (local or remote)

## Getting Started

### 1. Clone and Install Dependencies

The dependencies are already installed, but if you need to reinstall them:

```bash
npm install
```

### 2. Database Setup

1. **Start MySQL server** (if running locally)

2. **Create a database** called `romaniaendpoints_db`:
   ```sql
   CREATE DATABASE romaniaendpoints_db;
   ```

3. **Update the database connection** in `.env` file if needed:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/romaniaendpoints_db"
   ```

### 3. Run Database Migrations

Generate the Prisma client:

```bash
# Generate Prisma client
npx prisma generate

# If you add models later, create and run migration
npx prisma migrate dev --name init
```

### 4. Start the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check

| Method | Endpoint   | Description                                      |
|--------|------------|--------------------------------------------------|
| GET    | `/health`  | Health check with uptime and database status    |

### Example Health Check Response

```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up",
      "message": "Database connection is healthy",
      "timestamp": "2024-01-20T10:30:00.000Z"
    },
    "uptime": {
      "status": "up",
      "uptime": "0d 0h 5m 30s",
      "uptimeMs": 330000,
      "startTime": "2024-01-20T10:24:30.000Z"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up",
      "message": "Database connection is healthy",
      "timestamp": "2024-01-20T10:30:00.000Z"
    },
    "uptime": {
      "status": "up",
      "uptime": "0d 0h 5m 30s",
      "uptimeMs": 330000,
      "startTime": "2024-01-20T10:24:30.000Z"
    }
  }
}
```

### Example API Usage

#### Check application health:
```bash
curl http://localhost:3000/health
```

## Project Structure

```
src/
├── app.controller.ts          # Main application controller
├── app.module.ts             # Root application module
├── app.service.ts            # Main application service
├── main.ts                   # Application entry point
├── prisma.service.ts         # Prisma service for database connection
├── health.controller.ts      # Health check endpoints
└── prisma-health.indicator.ts # Database health check logic

prisma/
└── schema.prisma            # Database schema definition
```

## Database Schema

The schema is currently empty but ready for you to add your own models:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Add your models here
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/romaniaendpoints_db"

# Application
PORT=3000
NODE_ENV=development
```

## Development

### Adding New Models

1. Update the `prisma/schema.prisma` file
2. Generate the Prisma client: `npx prisma generate`
3. Create a migration: `npx prisma migrate dev --name your_migration_name`
4. Create corresponding service and controller files

### Database Management

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Production Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy migrations: `npx prisma migrate deploy`
4. Start the application: `npm run start:prod`

## Health Monitoring

The application includes a comprehensive health check endpoint at `/health` that monitors:

- **Database Connectivity**: Tests connection to MySQL database
- **Application Uptime**: Shows how long the application has been running
- **System Status**: Overall health status of the application

This endpoint is useful for:
- Load balancer health checks
- Monitoring systems
- DevOps automation
- Service discovery

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM for Node.js
- **MySQL** - Relational database
- **TypeScript** - Type-safe JavaScript
- **Terminus** - Health check module for NestJS

## License

This project is licensed under the MIT License.


LOAD DATA INFILE '/path/to/file'
INTO TABLE localities
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(@id, @nume, @diacritice, @judet, @auto, @zip, @populatie, @lat, @lng)
SET
  id = @id,
  nume = @nume,
  diacritice = @diacritice,
  judet = @judet,
  auto = @auto,
  zip = @zip,
  populatie = CASE WHEN @populatie = '' THEN 1 ELSE @populatie END,
  lat = @lat,
  lng = @lng;