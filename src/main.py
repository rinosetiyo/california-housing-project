
from fastapi import FastAPI
from pydantic import BaseModel, Field

from src.prediction import predict_house_price

app = FastAPI(
    title="California Housing Prediction API",
    description="API untuk memprediksi estimasi harga rumah",
    version="1.0.0"
)


# Struktur input yang wajib dikirim client
class HouseInput(BaseModel):
    MedInc: float = Field(allow_inf_nan=False)
    HouseAge: float = Field(allow_inf_nan=False)
    AveRooms: float = Field(allow_inf_nan=False)
    AveBedrms: float = Field(allow_inf_nan=False)
    Population: float = Field(allow_inf_nan=False)
    AveOccup: float = Field(allow_inf_nan=False)
    Latitude: float = Field(allow_inf_nan=False)
    Longitude: float = Field(allow_inf_nan=False)


# Endpoint untuk memeriksa API
@app.get("/")
def home():
    return {
        "message": "California Housing Prediction API is running"
    }


# Endpoint untuk memeriksa kesiapan API
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# Endpoint prediksi
@app.post("/predict")
def predict(data: HouseInput):

    input_data = data.model_dump()

    predicted_price = predict_house_price(input_data)

    return {
        "predicted_price": round(predicted_price, 2),
        "currency": "USD"
    }
