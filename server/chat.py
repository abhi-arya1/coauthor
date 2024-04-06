import google.generativeai as genai 
from dotenv import load_dotenv
from os import getenv

load_dotenv() 
GEMINI_API_KEY = getenv('GEMINI_KEY')

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

chat = model.start_chat(history=[])


def add_to_history(history, message, response):
    history.append({
            "role": "user",
            "parts": [message]
        })
    history.append(
        {
            "role": "model",
            "parts": [response]
        })
    return history

def send_message(message) -> tuple[list[dict], str]: 
    try: 
        message_to_send = f"{message}"
        response = chat.send_message(message_to_send)
        new_text = response.text

        history = add_to_history([] if not history else history, message, new_text)
    except Exception:
        add_to_history(message, "An error occurred while processing your request, try again.")

    return history


if __name__ == "__main__": 
    response = chat.send_message('Hello, how are you?')
    print(response.text)
    print(chat.history)


