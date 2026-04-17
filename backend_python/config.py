import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    API_KEY = os.getenv("CV_Text_Cleaning_Key")
    MODEL = os.getenv("MODEL_NAME")
