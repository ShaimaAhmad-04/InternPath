import os
from dotenv import load_dotenv

load_dotenv()

class Config:
  API_KEY = os.getenv("api_key")
  MODEL_NAME = os.getenv("MODEL_NAME")

