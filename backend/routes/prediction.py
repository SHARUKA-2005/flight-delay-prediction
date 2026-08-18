from fastapi import APIRouter, HTTPException

from schemas.prediction import (
    PredictionRequest,
    PredictionResponse
)

from services.prediction_service import make_prediction


router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"]
)


@router.post(
    "",
    response_model=PredictionResponse
)
def predict_flight(
    request: PredictionRequest
):
    try:
        return make_prediction(
            request.model_dump()
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )