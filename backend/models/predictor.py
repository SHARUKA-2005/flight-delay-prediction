import pandas as pd

from models.model_loader import model_loader
from utils.feature_processor import build_features


def predict(data):
    if model_loader.model is None:
        raise RuntimeError("Prediction model is not loaded")

    features = build_features(data)

    dataframe = pd.DataFrame([features])

    expected_columns = list(
        model_loader.model.named_steps["preprocessor"]
        .feature_names_in_
    )
    
    print("MODEL EXPECTED FEATURES:")
    print(expected_columns)

    missing_columns = set(expected_columns) - set(dataframe.columns)

    if missing_columns:
        raise ValueError(
            f"Missing required features: {sorted(missing_columns)}"
        )

    dataframe = dataframe[expected_columns]

    prediction = model_loader.model.predict(dataframe)[0]

    if hasattr(model_loader.model, "predict_proba"):
        probability = float(
            model_loader.model.predict_proba(dataframe)[0][1]
        )
    else:
        probability = float(
            model_loader.model.decision_function(dataframe)[0]
        )

    return int(prediction), probability