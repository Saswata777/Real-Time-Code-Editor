# app/schemas/room.py
from pydantic import BaseModel
from typing import Optional

class CreateRoomResponse(BaseModel):
    roomId: str

class RoomState(BaseModel):
    roomId: str
    code: str
    language: Optional[str] = "python"
