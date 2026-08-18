from models.predictor import predict
from models.model_loader import model_loader


def make_prediction(data):
    prediction, probability = predict(data)

    if prediction == 1:
        status = "Delayed"
    else:
        status = "On Time"

    return {
        "prediction": prediction,
        "status": status,
        "probability": round(probability, 4),
        "model": model_loader.best_model
    }