
import joblib
import pandas as pd

from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "../models/california_housing_model.joblib"
)

# Memuat model ketika modul pertama kali digunakan
artifact = joblib.load(MODEL_PATH)

model = artifact["model"]
feature_names = artifact["feature_names"]


def predict_house_price(input_data: dict) -> float:

    # Memeriksa apakah seluruh fitur tersedia
    missing_features = [
        feature
        for feature in feature_names
        if feature not in input_data
    ]

    if missing_features:
        raise ValueError(
            f"Missing features: {missing_features}"
        )

    # Menyesuaikan urutan fitur
    input_df = pd.DataFrame(
        [[input_data[name] for name in feature_names]],
        columns=feature_names
    )

    # Menjalankan prediksi
    prediction = model.predict(input_df)

    # Mengonversi satuan menjadi USD
    predicted_price = prediction[0] * 100000

    return float(predicted_price)
