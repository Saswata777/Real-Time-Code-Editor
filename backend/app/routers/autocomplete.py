# app/routers/autocomplete.py
from fastapi import APIRouter
from app.schemas.autocomplete import AutocompleteRequest, AutocompleteResponse

router = APIRouter(prefix="", tags=["autocomplete"])

def simple_mock_autocomplete(code: str, cursor: int, language: str) -> dict:
    # naive rule-based suggestions
    before = code[:cursor]
    last_word = before.split()[-1] if before.strip() else ""
    # example rules:
    if before.endswith("def ") or last_word == "def":
        suggestion = "function_name(params):\n    \"\"\"TODO: docstring\"\"\"\n    pass"
        start = cursor
        end = cursor
        return {"suggestion": suggestion, "start": start, "end": end}
    if before.endswith("import "):
        suggestion = "sys"
        start = cursor
        end = cursor
        return {"suggestion": suggestion, "start": start, "end": end}
    # fall back: suggest closing parentheses if user typed "("
    if before.endswith("("):
        suggestion = ")"
        start = cursor
        end = cursor
        return {"suggestion": suggestion, "start": start, "end": end}
    # default tiny suggestion
    return {"suggestion": "# TODO: complete", "start": cursor, "end": cursor}

@router.post("/autocomplete", response_model=AutocompleteResponse)
async def autocomplete(req: AutocompleteRequest):
    result = simple_mock_autocomplete(req.code, req.cursorPosition, req.language)
    return result
