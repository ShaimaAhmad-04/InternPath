import os
import sys
from fastapi import FastAPI, HTTPException

# Fix the path so it can find main.py and config.py
root_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_path not in sys.path:
    sys.path.insert(0, root_path)

from main import extract_text_from_pdf, parse_resume

structured_data = None

app = FastAPI()
# we are calling an AI
@app.post("/resume")
async def trigger_resume_parsing():
    # The path you want to process
    path = r"C:/Users/Ahmad/Downloads/archive/data/data/FINANCE/26961846.pdf"

    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail=f"File not found at {path}")

    try:
        # Step 1: Extract using your main.py function
        raw_text = extract_text_from_pdf(path)

        # Step 2: Parse using your OpenAI/Groq logic
        structured_data = parse_resume(raw_text)

        # Step 3: Return to the caller
        return {
            "status": "success",
            "data": structured_data
        }

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

