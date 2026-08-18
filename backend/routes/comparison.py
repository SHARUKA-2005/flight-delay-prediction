from fastapi import APIRouter
from services.comparison_service import get_comparison

router = APIRouter()


@router.get("/comparison")
def model_comparison():
    return get_comparison()