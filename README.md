# California Housing Price Prediction

Proyek Machine Learning untuk memprediksi median harga rumah menggunakan California Housing Dataset.

## Project Overview

Proyek ini bertujuan untuk membangun model prediksi harga rumah berdasarkan fitur-fitur yang tersedia pada dataset California Housing. Dataset ini terdiri dari berbagai variabel seperti median income, house age, average rooms, average bedrooms, population, average occupancy, latitude, dan longitude.

Tujuan utama dari proyek ini adalah membandingkan beberapa algoritma regresi untuk menemukan model terbaik yang dapat memprediksi harga rumah dengan akurasi yang baik serta generalisasi yang kuat.

## Dataset

Dataset yang digunakan adalah California Housing Dataset dari Scikit-learn.

Dataset ini berisi informasi rumah di California dan target variabelnya adalah median house value. Dataset ini sering digunakan sebagai benchmark dalam tugas machine learning untuk regresi.

## Machine Learning Algorithms

Proyek ini membandingkan beberapa algoritma berikut:

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor

Setiap model akan dilatih dan dievaluasi untuk melihat performanya dalam memprediksi median harga rumah.

## Evaluation Metrics

Model akan dievaluasi menggunakan metrik berikut:

- MAE (Mean Absolute Error)
- MSE (Mean Squared Error)
- RMSE (Root Mean Squared Error)

Metrik ini digunakan untuk mengukur seberapa akurat model dalam memprediksi harga rumah.

## Model Selection

Model dipilih berdasarkan performa evaluasi dan kemampuan generalisasi.

Proses pemilihan model dilakukan dengan membandingkan hasil metrik pada dataset validasi serta mempertimbangkan kemampuan model untuk bekerja dengan data baru yang belum pernah dilihat sebelumnya.

## Technologies

- Python
- Pandas
- NumPy
- Scikit-learn
- Matplotlib
- Seaborn

-fastapi
-uvicorn[standard]
-pandas
-numpy
-scikit-learn
-joblib
-pydantic


## Project Workflow

1. Load dan eksplorasi dataset
2. Preprocessing data
3. Train multiple regression models
4. Evaluate each model using MAE, MSE, dan RMSE
5. Compare model performance
6. Select the best-performing model

## Installation

Pastikan Python sudah terinstal di lingkungan Anda. Kemudian, install dependencies berikut:

```bash
pip install pandas numpy scikit-learn matplotlib seaborn
```

## Usage

Jalankan notebook atau skrip proyek untuk melatih model dan mengevaluasi performa.

```bash
python src/train_model.py
```

## Notes

Project ini dibuat sebagai contoh sederhana untuk penerapan machine learning dalam prediksi harga properti menggunakan dataset California Housing. hoooreeeee
# california-housing-project

# DOckerfile

FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/
COPY models/ ./models/

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]

# command docker
docker build -t california-housing-api .

docker images

docker run -d -p 8000:8000 --name housing-api california-housing-api

docker ps

docker stop housing-api

docker start housing-api