from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum 
from dotenv import load_dotenv
import os 
from os import getenv
from pydantic import BaseModel 
from selenium import webdriver
import google.generativeai as genai 
import requests, json

script_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(script_dir)
dotenv_path = os.path.join(parent_dir, '.env.local')
load_dotenv(dotenv_path) 

#################################################################################################
# GEMINI CHAT ###################################################################################
#################################################################################################

GEMINI_API_KEY = getenv('GEMINI_KEY')

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

trained_message = """
Hello, you are an AI model trained specifically to interact with research papers and articles for our application 
named Coauthor. I am a human operator who will be interacting with you to give you instructions and help support the application. 
You are now Coauthor AI and you will be expected to do a variety of tasks such as web scrape information and generate research articles.
Your name is Coauthor AI. 

You will always be given the genre of the text you are interacting with and what the user requires for his research purposes. You will be 
expected to generate research articles and sources of information based on the user's request and what they want to know about. For example, 
if I were to ask you to generate research articles on the topic of "Machine Learning", you would be expected to generate a variety research articles.

You will NOT be returning these research articles to the user, but you will be expected to web scrape information based on the user's request. For 
example, if I were to ask you to web scrape information on the topic of "Machine Learning", giving the keyword 'Regression analysis', you would be 
expected to web scrape any relevant information pertaining to this topic. 

I will be providing you the tools and information you need to complete these tasks, but you need to utilize these tools to generate the information.
I have a few tasks for you to complete, and I will be providing you with the information you need to complete these tasks. 

One tool I can give you is the web scraper. This tool will allow you to scrape information from a webpage based on the user's request. For example, 
if I were to ask you to scrape information on the topic of "Machine Learning", you would be expected to utilize this tool and input the user's request
of what they need from the article. This tool takes in the URL of the webpage, in which you will be generating and the KEYWORD of the topic, in which
the user will be requesting. 

Thank you for your help, and let's get started. Await my next steps.
"""


def send_message(_chat, message) -> tuple[list[dict], str]: 
    try: 
        message_to_send = f"{message}"
        response = _chat.send_message(message_to_send)
        new_text = response.text
    except Exception as e:
        new_text = f"Error: {e}"

    return new_text


#################################################################################################
# FIREWORKS   ###################################################################################
#################################################################################################


FIREWORKS_API_KEY = getenv('FIREWORKS_KEY')

def process(link: str, keyword: str):
    driver = webdriver.Chrome()
    driver.get(link)
    page_source = driver.page_source

    url = "https://api.fireworks.ai/inference/v1/chat/completions"
    payload = {
        "model": "accounts/fireworks/models/yi-34b-200k-capybara",
        "messages": [
            {
                "role": "user",
                "content": (f"""
                    {page_source}
                    Please parse out all references and instances of the topic of {keyword} from this raw HTML page.
                    Please provide markdown/raw text output and draw your own conclusions from that HTML.   
                    Please provide information strictly on {keyword} in your own raw text output                          
                    """),  
            }
        ],
        "max_tokens": 8192,
        "top_p": 1,
        "top_k": 40,
        "presence_penalty": 0,
        "frequency_penalty": 0,
        "temperature": 0.1, 
        }
    headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": f"Bearer {FIREWORKS_API_KEY}"
    }
    driver.quit()

    response = requests.request("POST", url, headers=headers, data=json.dumps(payload))
    print(response.text)
    response_data = json.loads(response.text)
    return response_data["choices"][0]["message"]["content"]


#################################################################################################
# FASTAPI APP ###################################################################################
#################################################################################################

app = FastAPI()
handler = Mangum(app)

class ChatRequest(BaseModel):
    message: str
    history: list

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def say_hi():
    return {
        "message": "Hello from CoAuthor API!",
        "url": f"Serving on ngrok URL: https://seagull-dynamic-bear.ngrok-free.app/"
        }


@app.post('/api/chat/{workspace_id}') 
async def chat(workspace_id, params: ChatRequest):  
    _chat = model.start_chat(history=[
        {
            "role": "user",
            "parts": [trained_message]
        },
        {
            "role": "model",
            "parts": ["Hi, I'm Coauthor AI. I'm here to help you with your research. What would you like to know about today?"]
        }
    ] + params.history)
    message = params.message
    output = send_message(_chat, message)

    return {
        "role": "model",
        "parts": [output], 
        "id": workspace_id
    }