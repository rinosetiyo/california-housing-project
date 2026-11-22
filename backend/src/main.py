
from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict, Field

from src.prediction import predict_house_price

app = FastAPI(
    title="California Housing Prediction API",
    description="Machine Learning API for house price estimation",
    version="1.0.0"
)


class HouseInput(BaseModel):

    model_config = ConfigDict(extra="forbid")

    MedInc: float = Field(allow_inf_nan=False)
    HouseAge: float = Field(allow_inf_nan=False)
    AveRooms: float = Field(allow_inf_nan=False)
    AveBedrms: float = Field(allow_inf_nan=False)
    Population: float = Field(allow_inf_nan=False)
    AveOccup: float = Field(allow_inf_nan=False)
    Latitude: float = Field(allow_inf_nan=False)
    Longitude: float = Field(allow_inf_nan=False)


@app.get("/")
def home():
    return {
        "message": "California Housing API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/predict")
def predict(data: HouseInput):

    input_data = data.model_dump()

    predicted_price = predict_house_price(input_data)

    return {
        "predicted_price": round(predicted_price, 2),
        "currency": "USD"
    }
