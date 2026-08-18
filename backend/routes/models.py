from fastapi import APIRouter

from models.model_loader import model_loader

router = APIRouter(prefix="/models", tags=["Models"])


@router.get("")
def get_models():
    metrics = model_loader.metrics

    if metrics is None:
        return {
            "models": [],
            "message": "Model metrics are not available"
        }

    return {
        "models": metrics
    }