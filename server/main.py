from fastapi import FastAPI
from mangum import Mangum 

app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def say_hi():
    return {"message": "Hello from CoAuthor API!"}