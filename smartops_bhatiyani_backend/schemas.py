from pydantic import BaseModel

# Schema for reading a Metric (used in responses)
class Metric(BaseModel):
    id: int
    name: str
    value: str

    class Config:
        orm_mode = True  # enables reading ORM objects (e.g., from SQLAlchemy)


# Schema for creating a Metric (used in POST requests)
class MetricCreate(BaseModel):
    name: str
    value: str
