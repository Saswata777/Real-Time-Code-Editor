# app/main.py
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.routers.rooms import router as rooms_router
from app.routers.autocomplete import router as autocomplete_router
from app.services.db import connect, disconnect, init_db
from app.services.room_manager import room_manager

app = FastAPI(title="CodeCollab Backend")

# allow your frontend origin(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rooms_router)
app.include_router(autocomplete_router)

# simple broadcaster: keep mapping room_id -> set of websockets (we also keep in Room)
connected = {}

@app.on_event("startup")
async def startup():
   await connect()
   await init_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect()

async def broadcast_to_room(room_id: str, message: dict, exclude: WebSocket = None):
    room = await room_manager.get_room(room_id)
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
    # cleanup
    for ws in to_remove:
        room.clients.discard(ws)

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()

    room = await room_manager.get_room(room_id)
    if room is None:
        from app.services.room_manager import Room
        room = Room(room_id)
        room_manager.rooms[room_id] = room

    room.clients.add(websocket)

    try:
        # Send initial state
        await websocket.send_text(json.dumps({
            "type": "INIT",
            "code": room.code,
            "language": room.language
        }))

        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            msg_type = payload.get("type")

            # --- CODE UPDATE -------------------------------------------------
            if msg_type == "CODE_UPDATE":
                new_code = payload.get("code", "")
                await room_manager.update_code(room_id, new_code)

                # Broadcast to all except sender
                await broadcast_to_room(
                    room_id,
                    {"type": "CODE_UPDATE", "code": new_code},
                    exclude=websocket
                )

            # --- CURSOR MOVE ------------------------------------------------
            elif msg_type == "CURSOR_MOVE":
                await broadcast_to_room(
                    room_id,
                    {
                        "type": "CURSOR_MOVE",
                        "user": payload.get("user"),
                        "cursor": payload.get("cursor")
                    },
                    exclude=websocket
                )

            # --- UNKNOWN -----------------------------------------------------
            else:
                await broadcast_to_room(room_id, payload, exclude=websocket)

    except WebSocketDisconnect:
        room.clients.discard(websocket)

    except Exception as e:
        print("WebSocket error:", e)
        room.clients.discard(websocket)
