import os
import sys
import requests
from fastapi import FastAPI, HTTPException

# This line ensures this file can "see" main.py in the folder above it
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import extract_text_from_pdf, parse_resume

app = FastAPI()


from fastapi import FastAPI, UploadFile, File, HTTPException
import fitz  # PyMuPDF
from openai import OpenAI
import os
import requests
from dotenv import load_dotenv
from config import Config
from docx2python import docx2python


load_dotenv()
app = FastAPI()
client = OpenAI(api_key=Config.API_KEY, base_url= Config.MODEL_NAME)


@app.post("/upload-cv")
async def create_profile_from_cv(file: UploadFile = File(...)):
  text = ""
  file_bytes = await file.read()  # Read once to use for both types

  try:
    # 1. Handle DOCX
    if file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      print("Processing DOCX file...")
      temp_path = "temp_resume.docx"
      with open(temp_path, "wb") as buffer:
        buffer.write(file_bytes)

      with docx2python(temp_path) as docx_content:
        text = docx_content.text

      os.remove(temp_path)

      # 2. Handle PDF
    elif file.content_type == "application/pdf":
      print("Processing PDF file...")
      doc = fitz.open(stream=file_bytes, filetype="pdf")
      text = "".join([page.get_text() for page in doc])

    else:
      raise HTTPException(status_code=400, detail="Unsupported file type. Please upload PDF or DOCX.")

    # 3. AI Parsing (Only if text was successfully extracted)
    if not text.strip():
      raise HTTPException(status_code=400, detail="Could not extract text from file.")

    print("Sending to AI...")
    prompt = f"Extract name, email, and skills from this CV text into valid JSON: {text}"
    ai_response = client.chat.completions.create(
      model="llama3-8b-8192",
      messages=[{"role": "user", "content": prompt}],
      response_format={"type": "json_object"}
    )
    structured_data = ai_response.choices[0].message.content

    # 4. Handoff to Node.js
    node_url = "http://localhost:3000/api/profiles/create"
    requests.post(node_url, json=structured_data)

    return {"message": "Profile created successfully", "preview": structured_data}

  except Exception as e:
    print(f"Error: {e}")
    raise HTTPException(status_code=500, detail=str(e))
