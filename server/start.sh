source venv/bin/activate
uvicorn main:app --reload 
deactivate
# ngrok http --domain=seagull-dynamic-bear.ngrok-free.app 8000 
