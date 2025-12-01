# app/routers/rooms.py
from fastapi import APIRouter, HTTPException
from app.schemas.room import Room
from app.services.room_service import room_service


router = APIRouter(prefix="/rooms", tags=["rooms"])

@router.post("", response_model=Room)
async def create_room():
    room_id = await room_service.create_room()
    return {"roomId": room_id}
