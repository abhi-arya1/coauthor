from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import google.generativeai as genai 
from dotenv import load_dotenv
from os import getenv
import requests, json

load_dotenv() 
FIREWORKS_API_KEY = getenv('FIREWORKS_KEY')

driver = webdriver.Chrome()

def process(a: str, keyword: str):
    driver.get(a)
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