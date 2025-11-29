# app/routers/rooms.py
from fastapi import APIRouter, HTTPException
from app.schemas.room import CreateRoomResponse
from app.services.room_manager import room_manager

router = APIRouter(prefix="/rooms", tags=["rooms"])

@router.post("", response_model=CreateRoomResponse)
async def create_room():
    room_id = await room_manager.create_room()
    return {"roomId": room_id}
