from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json
from app.services.room_service import room_service

router = APIRouter()

async def broadcast(room_id: str, message: dict, exclude: WebSocket = None):
    room = await room_service.get_room(room_id)
    if not room:
        return

    to_remove = []
    for ws in set(room.clients):
        if ws is exclude:
            continue
        try:
            await ws.send_text(json.dumps(message))
        except Exception:
            to_remove.append(ws)

    for ws in to_remove:
        room.clients.discard(ws)


@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()

    room = await room_service.get_room(room_id)
    if room is None:
        from app.services.room_service import Room
        room = Room(room_id)
        room_service.rooms[room_id] = room

    room.clients.add(websocket)

    try:
        # Send initial state
        await websocket.send_text(json.dumps({
            "type": "INIT",
            "code": room.code,
            "language": room.language
        }))

        while True:
            raw = await websocket.receive_text()
            data = json.loads(raw)
            msg = data.get("type")

            if msg == "CODE_UPDATE":
                new_code = data.get("code", "")
                await room_service.update_code(room_id, new_code)
                await broadcast(room_id, {"type": "CODE_UPDATE", "code": new_code}, exclude=websocket)

            elif msg == "CURSOR_MOVE":
                await broadcast(room_id, {
                    "type": "CURSOR_MOVE",
                    "user": data.get("user"),
                    "cursor": data.get("cursor")
                }, exclude=websocket)

            else:
                await broadcast(room_id, data, exclude=websocket)

    except WebSocketDisconnect:
        room.clients.discard(websocket)

    except Exception as e:
        print("WebSocket error:", e)
        room.clients.discard(websocket)
