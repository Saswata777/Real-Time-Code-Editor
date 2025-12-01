# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.rooms import router as rooms_router
from app.routers.autocomplete import router as autocomplete_router
from app.routers.ws import router as ws_router

from app.database.db import connect, disconnect, init_db


app = FastAPI(title="CodeCollab Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(rooms_router)
app.include_router(autocomplete_router)
app.include_router(ws_router)

@app.on_event("startup")
async def startup():
    await connect()
    await init_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect()
