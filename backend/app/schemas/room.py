# app/schemas/room.py
from pydantic import BaseModel
from typing import Optional

class Room(BaseModel):
    room_id: str

class RoomState(BaseModel):
    room_id: str
    code: str
    language: Optional[str] = "python"
