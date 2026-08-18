import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
METRICS_PATH = BASE_DIR / "artifacts" / "model_metrics.json"


def get_comparison():
    if not METRICS_PATH.exists():
        raise FileNotFoundError(
            f"model_metrics.json not found at {METRICS_PATH}"
        )

    with open(METRICS_PATH, "r", encoding="utf-8") as file:
        data = json.load(file)

    metrics = data.get("metrics", [])

    if not isinstance(metrics, list):
        raise ValueError("Invalid metrics format in model_metrics.json")

    best_model = data.get("best_model")

    return {
        "best_model": best_model,
        "selection_metric": data.get("selection_metric", "ROC-AUC"),
        "test_size": data.get("test_size", 0.2),
        "random_state": data.get("random_state", 42),
        "metrics": metrics
    }