from fastapi import FastAPI
from mangum import Mangum 
from dotenv import load_dotenv
from os import getenv

load_dotenv() 

app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def say_hi():
    return {
        "message": "Hello from CoAuthor API!",
        "url": f"Serving on AWS URL: {getenv('AWS_URL')}"
        }