# Mock Database Guide

## Overview

JStar now supports running without a PostgreSQL database by using an in-memory mock database. This is useful for:
- Development without database setup
- Testing features locally
- CI/CD pipelines

## How It Works

The application automatically detects if `DATABASE_URL` is not set and switches to Mock Database mode.

### Configuration

1. **Default Behavior**: If `DATABASE_URL` is not set, the app automatically uses Mock Database
2. **Force Mock Mode**: Set `USE_MOCK_DB=true` to force using Mock Database even if `DATABASE_URL` is set

### Environment Variables

```bash
# Option 1: No DATABASE_URL (default uses Mock Database)
# DATABASE_URL is not set

# Option 2: Force Mock Database
USE_MOCK_DB=true
DATABASE_URL=postgresql://...  # Optional, will be ignored if USE_MOCK_DB=true

# Option 3: Use Real Database (default when DATABASE_URL is set)
DATABASE_URL=postgresql://user:pass@localhost:5432/jstar
```

## Running the Backend

### Without Database (Mock Mode)

```bash
cd backend
python -m flask run
# or
python app.py
```

Expected output:
```
🔧 Using MOCK Database (no PostgreSQL)
✅ Mock Database connected successfully!
🔧 Using Mock Database (no DATABASE_URL found)
✅ Users table created/verified!
 * Running on http://127.0.0.1:5001
```

### With Real Database

Set the DATABASE_URL environment variable:
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/jstar"
python app.py
```

## Testing API Endpoints

```bash
# Register a new user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User", "password": "password123"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Health check
curl http://localhost:5001/api/health
```

## Limitations

The Mock Database:
- **In-memory only**: Data is lost when the server stops
- **Single instance**: Not suitable for multi-server deployments
- **Basic SQL support**: Only supports common query patterns used by the app
- **No persistence**: Cannot persist user data between restarts

## Files Modified

- `backend/src/database.py` - Added auto-detection of Mock Database
- `backend/src/database_mock.py` - New Mock Database implementation

