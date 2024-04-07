source venv/bin/activate
uvicorn main:app  --reload --host 0.0.0.0 --port 8000
deactivate
# ngrok http --domain=seagull-dynamic-bear.ngrok-free.app 8000 
