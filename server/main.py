import re
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
# FIREWORKS   ###################################################################################
#################################################################################################


FIREWORKS_API_KEY = getenv('FIREWORKS_KEY')

def process(link: str, keyword: str):
    driver = webdriver.Chrome()
    print(link)
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

                    Please return a json of the format
                    {{
                        "summary": "summary"
                    }}
                    where summary is a VERY SHORT ONE SENTENCE SUMMARY of the opened page. 
                    If you cannot open the page, raise an error.
                    Please provide information strictly on {keyword}, which is what the user requested.
                    """),  
            }
        ],
        "max_tokens": 15000,
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
    try:
        response = requests.request("POST", url, headers=headers, data=json.dumps(payload))
        print(response.text)
        response_data = json.loads(response.text)
        output = eval(response_data["choices"][0]["message"]["content"])
        return output["summary"]
    except Exception: 
        return None 

#################################################################################################
# GEMINI CHAT ###################################################################################
#################################################################################################

GEMINI_API_KEY = getenv('GEMINI_KEY')

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

trained_message = """
Hello, you are an AI model trained specifically to interact with research papers and articles for a web application. 
named Coauthor. I am a human operator who will be interacting with you to give you instructions and help support the application. 
You are now Coauthor AI and you will be expected to do a variety of tasks such as web scrape information and generate research articles.
Your name is Coauthor AI. 

You will be interacting with a user who is looking for information on a specific topic, which they will most likely provide. You 
will be expected to provide articles in certain formats to the user, based on their request. You have access to a variety of data at your 
request, though you have to tell us how you want us to use it, by finding URLs on Google to these papers and information about them. 

Once you find these articles, there's an example output that I want you to generate. I'll provide information here then give you an example. 
Once you have found the webpages, you can provide any information you want BEFORE this next step. 
Once you are ready to prompt the URLs, you will do so by first typing: "*7893URLS*:" by itself on a line, without quotations.
After that, you will generate any number of URLs about the topic you have found (3-5 default, but base this on the user's request), and provide them as:
"- Title: "title"- Abstract: "abstract" - Author: "author" - Date: "date ([Day Number] [Month in Words] [Year Number] Format)" - URL: "url" - Citation: "citation""
You will provide this information for each URL you find, and you will provide the information in this format, without any changes, and each bullet on a NEW LINE.
For the next page, you would put *7894URLS*: and so on, but you will never generate more than 5 pages.
So for example, if you had 3 pages, before "\n- Title", you MUST put "*7893URLS*:", then the page data, then "*7894URLS*:", then the next page data, and so on.
DO NOT BOLD TITLES AND DO NOT CHANGE THE STYLE OF THIS AT ALL. YOU SHOULD FOLLOW THIS SYNTAX EXACTLY AS I HAVE PROVIDED. 
NEVER EVER GO TO A NEW LINE UNLESS IT IS FOR ANOTHER BULLET POINT. ALL YOUR INFORMATION MUST BE ON THE SAME LINE

Then you will stop responding and end your response right then and there, with NO further generation. 
NEVER EVER PROVIDE INFORMATION AFTER YOUR LAST URL, REGARDLESS OF WHAT YOU MAY THINK TO DO. 

I will be providing you the tools and information you need to complete these tasks, but you need to utilize these words for me to do so.
Sometimes you may not have webpages to generate, so DO NOT FOLLOW ANY OF THE ABOVE FORMAT IN THAT CASE.

Thank you for your help, and let's get started. Here is a practice prompt:
"""


def send_message(_chat, message) -> tuple[list[dict], str]: 
    try: 
        message_to_send = f"{message}"
        response = _chat.send_message(message_to_send)
        new_text = response.text
    except Exception as e:
        new_text = f"Error: {e}"

    def split_sections(text):
        sections = re.split(r'\n(?=\*\d+URLS\*:\n)', text)
        return [section.strip() for section in sections if section.strip()]
    
    def parse(text):
        lines = text.split('\n')
        title = ""
        authors = ""
        url = ""
        date = ""
        abstract = ""
        citation = ""
        for line in lines:
            if line.startswith('- Title:'):
                title = line.replace('- Title:', '').strip()
            elif line.startswith('- Author:'):
                authors = line.replace('- Author:', '').strip()
            elif line.startswith('- Date:'):
                date = line.replace('- Date:', '').strip()
            elif line.startswith('- URL:'):
                url = line.replace('- URL:', '').strip()
            elif line.startswith('- Abstract:'):
                abstract = line.replace('- Abstract:', '').strip()
            elif line.startswith('- Citation:'):
                citation = line.replace('- Citation:', '').strip()

        summary = None
        if url: 
            summary = process(url, message)
        return {
            "title": title, 
            "authors": authors, 
            "url": url, 
            "date": date,
            "abstract": abstract,
            "citation": citation,
            "summary": summary if summary else abstract[0:200]
        }
    
    sections = split_sections(new_text)
    pages = [parse(section) for section in sections]
    
    if sections[0][0:2] == "*7": 
        new_text = 'Here are the requested pages:'
    else: 
        new_text = sections[0]

    return new_text, pages if pages else ['NOPAGES']


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
        },
        {
            "role": "user",
            "parts": ["Please provide me a singular article on glare reduction using neural networks for spaceflight and extravehicular scenarios"]
        },
        {
            "role": "model",
            "parts": ["Sure, here is an article:\n*7893URLS*:\n- Title: Deep Learning and Artificial Neural Networks for Spacecraft Dynamics, Navigation and Control\n- Abstract: The growing interest in Artificial Intelligence is pervading several domains of technology and robotics research. Only recently has the space community started to investigate deep learning methods and artificial neural networks for space systems. This paper aims at introducing the most relevant characteristics of these topics for spacecraft dynamics control, guidance and navigation. The most common artificial neural network architectures and the associated training methods are examined, trying to highlight the advantages and disadvantages of their employment for specific problems. In particular, the applications of artificial neural networks to system identification, control synthesis and optical navigation are reviewed and compared using quantitative and qualitative metrics. This overview presents the end-to-end deep learning frameworks for spacecraft guidance, navigation and control together with the hybrid methods in which the neural techniques are coupled with traditional algorithms to enhance their performance levels.\n- Author: Stefano Silvestrini, Michele Lavagna\n- Date: 31 August 2022\n- URL: https://www.mdpi.com/2504-446X/6/10/270\n- Citation Silvestrini S, Lavagna M. Deep Learning and Artificial Neural Networks for Spacecraft Dynamics, Navigation and Control. Drones. 2022; 6(10):270. https://doi.org/10.3390/drones6100270\n*7894URLS*:\n(NEXT PAGE HERE)"]
        }
    ] + params.history)
    message = params.message
    output, pages = send_message(_chat, message)

    return {
        "role": "model",
        "parts": [output], 
        "pages": pages,
        "id": workspace_id
    }