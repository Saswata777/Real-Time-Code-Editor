# app/schemas/autocomplete.py
from pydantic import BaseModel

class AutocompleteRequest(BaseModel):
    code: str
    cursorPosition: int
    language: str

class AutocompleteResponse(BaseModel):
    suggestion: str
    start: int
    end: int
