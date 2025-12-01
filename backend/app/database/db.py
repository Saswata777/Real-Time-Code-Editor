# app/services/db.py
import os
from databases import Database

# Default to SQLite file so you can run without installing Postgres.
# If you want Postgres, set env var DATABASE_URL before starting:
#   PowerShell:  $env:DATABASE_URL = "postgresql://user:pass@localhost:5432/dbname"
#   Linux/macOS: export DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./codecollab.db")
database = Database(DATABASE_URL)


async def connect():
    """Connect the database (call at FastAPI startup)."""
    if not database.is_connected:
        await database.connect()


async def disconnect():
    """Disconnect the database (call at FastAPI shutdown)."""
    if database.is_connected:
        await database.disconnect()


async def init_db():
    """Create the rooms table if it doesn't exist."""
    # Use SQL compatible with both SQLite and Postgres (SQLite >= 3.24 supports ON CONFLICT DO UPDATE)
    query = """
    CREATE TABLE IF NOT EXISTS rooms (
        room_id TEXT PRIMARY KEY,
        code TEXT,
        language TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    # await database.execute(query=query)
    async with database.transaction():
        try:
            await database.execute(query=query)
            print("Database initialized successfully.")
        except Exception as e:
            # transaction will auto rollback
            print("DB initialization failed — rolled back.")
            print("Error:", e)
            raise e  # optional: rethrow to stop the app
