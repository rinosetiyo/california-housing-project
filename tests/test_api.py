
from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)


def test_home_endpoint():

    response = client.get("/")

    assert response.status_code == 200

    assert response.json() == {
        "message": "California Housing API is running"
    }


def test_health_endpoint():

    response = client.get("/health")

    assert response.status_code == 200

    assert response.json()["status"] == "healthy"


def test_predict_endpoint():

    payload = {
        "MedInc": 5.0,
        "HouseAge": 30.0,
        "AveRooms": 5.5,
        "AveBedrms": 1.2,
        "Population": 1000.0,
        "AveOccup": 3.0,
        "Latitude": 34.05,
        "Longitude": -118.25
    }

    response = client.post(
        "/predict",
        json=payload
    )

    assert response.status_code == 200

    result = response.json()

    assert "predicted_price" in result
    assert result["currency"] == "USD"


def test_predict_missing_feature():

    payload = {
        "MedInc": 5.0,
        "HouseAge": 30.0
    }

    response = client.post(
        "/predict",
        json=payload
    )

    assert response.status_code == 422


def test_predict_extra_feature():

    payload = {
        "MedInc": 5.0,
        "HouseAge": 30.0,
        "AveRooms": 5.5,
        "AveBedrms": 1.2,
        "Population": 1000.0,
        "AveOccup": 3.0,
        "Latitude": 34.05,
        "Longitude": -118.25,
        "UnknownFeature": 100
    }

    response = client.post(
        "/predict",
        json=payload
    )

    assert response.status_code == 422
