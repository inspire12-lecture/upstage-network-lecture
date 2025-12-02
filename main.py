from fastapi import FastAPI

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")



@app.get("/hello")
def hello():
    return {"message": "Hello FastAPI!"}


# Frontend routes
@app.get("/")
async def read_index():
    return FileResponse('template/index.html')
