import fitz  # PyMuPDF
import json
from openai import OpenAI
from config import Config
import prompts

# Initialize Client
client = OpenAI(api_key=Config.API_KEY, base_url="https://api.groq.com/openai/v1")  # Added Groq base URL if using Groq


def extract_text_from_pdf(pdf_path):
  """Handles the PDF extraction logic."""
  doc = fitz.open(pdf_path)
  text = ""
  for page in doc:
    text += page.get_text() + "\n"
  return text


def parse_resume(full_text):
  """Handles the AI API call logic."""
  response = client.chat.completions.create(
    model=Config.MODEL,
    messages=[
      {"role": "system", "content": prompts.SYSTEM_MESSAGE},
      {"role": "user", "content": prompts.get_resume_prompt(full_text)},
    ],
    response_format={'type': 'json_object'}
  )
  return json.loads(response.choices[0].message.content)


if __name__ == "__main__":
  path = "C:/Users/Ahmad/Downloads/archive/data/data/FINANCE/26961846.pdf"

  try:
    # Step 1: Extract
    raw_text = extract_text_from_pdf(path)

    # Step 2: Parse
    structured_data = parse_resume(raw_text)

    # Step 3: Result
    print(json.dumps(structured_data, indent=2))

  except Exception as e:
    print(f"An error occurred: {e}")
