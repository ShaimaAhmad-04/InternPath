import os
import json
import fitz  # For PDFs
from docx2python import docx2python  # For DOCX
from openai import OpenAI
from config import Config
import prompts

# Initialize Client
client = OpenAI(api_key=Config.API_KEY, base_url="https://api.groq.com/openai/v1")


def extract_text(file_path):
  """Detects file type and extracts text accordingly."""
  ext = os.path.splitext(file_path)[1].lower()

  if ext == ".pdf":
    doc = fitz.open(file_path)
    return "\n".join([page.get_text() for page in doc])

  elif ext == ".docx":
    with docx2python(file_path) as docx_content:
      return docx_content.text

  else:
    raise ValueError(f"Unsupported file extension: {ext}")


def parse_resume(full_text):
  """Handles the AI API call logic."""
  response = client.chat.completions.create(
    model=Config.MODEL_NAME,
    messages=[
      {"role": "system", "content": prompts.SYSTEM_MESSAGE},
      {"role": "user", "content": prompts.get_resume_prompt(full_text)},
    ],
    response_format={'type': 'json_object'}
  )
  # Convert string response to Python Dictionary
  return json.loads(response.choices[0].message.content)


if __name__ == "__main__":
  # Ensure this path is correct on your machine
  path = "C:/Users/Ahmad/OneDrive/Desktop/Career/Shaima Ahmad 0782020517.docx"

  try:
    # 1. Get the text based on file type
    raw_text = extract_text(path)

    # 2. Parse with AI
    structured_data = parse_resume(raw_text)

    # 3. Print the result
    print("\n--- Structured Data ---")
    print(json.dumps(structured_data, indent=2))

  except Exception as e:
    print(f"An error occurred: {e}")
