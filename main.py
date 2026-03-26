import fitz  # PyMuPDF
from openai import OpenAI
import json

# 1. Extract ALL text from the PDF
doc = fitz.open("C:/Users/Ahmad/Downloads/archive/data/data/FINANCE/26961846.pdf")
full_text = ""
for page in doc:
    full_text += page.get_text() + "\n"  # Append text from every page

# 2. Setup the Groq Client
client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key= "YOUR_REAL_KEY" # Ensure this is your actual key
)

def extract_resume_data(resume_text):
    # It's better to define the prompt inside the function so it uses the passed text
    prompt = f"""
        Extract: Name, Email, Skills, Degree,University,Phone Number,GPA,Profile Summary and Total Experience.
        Text: {resume_text}
        Return ONLY a JSON object.
       STRICT RULES:
    1. For 'Name', 'Email', 'Phone Number', and 'University': If not explicitly found, return null.
    2. For 'Total Experience': Do NOT just look for a number. Calculate the total duration by summing up the dates of all work experiences provided. If no dates/experience are found, return null.
    3. For 'Skills': List all technical and soft skills identified.
    4. For 'GPA': Extract if mentioned, otherwise return null.
        """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that outputs JSON."},
            {"role": "user", "content": prompt},
        ],
        response_format={'type': 'json_object'}
    )
    return json.loads(response.choices[0].message.content)

# 3. Run the extraction
try:
    structured_data = extract_resume_data(full_text)
    print(json.dumps(structured_data, indent=2))
except Exception as e:
    print(f"An error occurred: {e}")
