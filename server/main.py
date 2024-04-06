from fastapi import FastAPI
from mangum import Mangum 
from dotenv import load_dotenv
from os import getenv
from gemini import send_message, add_to_history
import json

load_dotenv() 

app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def say_hi():
    return {
        "message": "Hello from CoAuthor API!",
        "url": f"Serving on AWS URL: {getenv('AWS_URL')}"
        }

@app.post('/chat') 
async def chat(history: dict, message: str):
    return {
        "history": add_to_history(history, message, send_message(message))
    }