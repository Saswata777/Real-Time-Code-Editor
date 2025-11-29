# app/services/room_manager.py
import asyncio
import uuid
from typing import Dict, Set, Any
from app.services.db import database

class Room:
    def __init__(self, room_id: str, code: str = "", language: str = "python"):
        self.room_id = room_id
        self.code = code
        self.language = language
        self.clients = set()  # set of websocket connections

class RoomManager:
    def __init__(self):
        self.rooms: Dict[str, Room] = {}
        self._lock = asyncio.Lock()

    async def create_room(self) -> str:
        room_id = uuid.uuid4().hex[:8]
        async with self._lock:
            self.rooms[room_id] = Room(room_id)
            await self._upsert_room(room_id, "")
        return room_id

    async def get_room(self, room_id: str) -> Room:
        async with self._lock:
            if room_id in self.rooms:
                return self.rooms[room_id]
            # try to load from DB
            row = await database.fetch_one("SELECT code, language FROM rooms WHERE room_id = :rid", values={"rid": room_id})
            if row:
                room = Room(room_id, code=row["code"] or "", language=row["language"] or "python")
                self.rooms[room_id] = room
                return room
            return None

    async def update_code(self, room_id: str, new_code: str):
        async with self._lock:
            if room_id not in self.rooms:
                self.rooms[room_id] = Room(room_id)
            self.rooms[room_id].code = new_code
            await self._upsert_room(room_id, new_code)

    async def _upsert_room(self, room_id: str, code: str):
        # query = """
        # INSERT INTO rooms (room_id, code, language, updated_at)
        # VALUES (:rid, :code, 'python', NOW())
        # ON CONFLICT (room_id) DO UPDATE SET code = EXCLUDED.code, updated_at = NOW()
        # """
        query = """
            INSERT INTO rooms (room_id, code, language, updated_at)
            VALUES (:rid, :code, 'python', CURRENT_TIMESTAMP)
            ON CONFLICT (room_id) DO UPDATE SET code = EXCLUDED.code, updated_at = CURRENT_TIMESTAMP
        """

        await database.execute(query=query, values={"rid": room_id, "code": code})

room_manager = RoomManager()
