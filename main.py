from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/hello")
def hello():
    return {"message": "Hello FastAPI!"}

@app.get("/image")
def get_image():
    image_path = "image/oh.jpeg"
    if os.path.exists(image_path):
        return FileResponse(image_path, media_type="image/jpeg")
        # return FileResponse(image_path, media_type="text/json")
    else:
        return {"error": "Image not found"}