from fastapi import FastAPI
from mangum import Mangum 

AWS_URL = "https://kcg52nngxu3ihw6e5mmusqdyse0bchdg.lambda-url.us-east-2.on.aws/"

app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def say_hi():
    return {
        "message": "Hello from CoAuthor API!",
        "url": f"Serving on AWS URL: {AWS_URL}"
        }