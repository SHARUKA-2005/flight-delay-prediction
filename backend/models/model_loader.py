from pathlib import Path
import json
import joblib
import sklearn


BASE_DIR = Path(__file__).resolve().parent.parent
ARTIFACT_DIR = BASE_DIR / "artifacts"


class ModelLoader:
    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.metrics = None
        self.best_model = None
        self.selection_metric = None
        self.load()

    def load(self):
        model_path = ARTIFACT_DIR / "model.pkl"
        preprocessor_path = ARTIFACT_DIR / "preprocessor.pkl"
        metrics_path = ARTIFACT_DIR / "model_metrics.json"

        if not model_path.exists():
            raise FileNotFoundError(
                f"Model file not found: {model_path}"
            )

        if not metrics_path.exists():
            raise FileNotFoundError(
                f"Metrics file not found: {metrics_path}"
            )

        try:
            self.model = joblib.load(model_path)

            if preprocessor_path.exists():
                self.preprocessor = joblib.load(
                    preprocessor_path
                )

        except Exception as e:
            raise RuntimeError(
                f"Failed to load ML artifacts with "
                f"scikit-learn {sklearn.__version__}: {e}"
            ) from e

        with open(metrics_path, "r") as file:
            metrics_data = json.load(file)

        self.best_model = metrics_data.get(
            "best_model"
        )

        self.selection_metric = metrics_data.get(
            "selection_metric"
        )

        self.metrics = metrics_data.get(
            "metrics",
            []
        )


model_loader = ModelLoader()