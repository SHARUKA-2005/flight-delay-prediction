from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    airline: str
    origin: str
    destination: str
    flight_number: int = Field(gt=0)
    month: int = Field(ge=1, le=12)
    day_of_month: int = Field(ge=1, le=31)
    day_of_week: int = Field(ge=1, le=7)
    scheduled_dep_time: float = Field(ge=0, le=2359)
    dep_time: float = Field(ge=0, le=2359)
    scheduled_arrival_time: float = Field(ge=0, le=2359)
    distance: float = Field(gt=0)


class PredictionResponse(BaseModel):
    prediction: int
    status: str
    probability: float
    model: str