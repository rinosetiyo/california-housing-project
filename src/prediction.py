
import joblib
import pandas as pd
from pathlib import Path

# Lokasi folder utama proyek
BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = (
    BASE_DIR / "models" /
    "california_housing_model.joblib"
)

# Memuat model satu kali ketika modul diimpor
artifact = joblib.load(MODEL_PATH)

model = artifact["model"]
feature_names = artifact["feature_names"]


def predict_house_price(input_data):

    # Memastikan urutan fitur sesuai training
    input_df = pd.DataFrame(
        [input_data],
        columns=feature_names
    )

    # Melakukan inference
    prediction = model.predict(input_df)

    # Mengubah satuan menjadi USD
    predicted_price = prediction[0] * 100000

    return float(predicted_price)
