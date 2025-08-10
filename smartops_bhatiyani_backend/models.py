from sqlalchemy import Column, Integer, String
from database import Base

# SQLAlchemy model for a business metric
class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    value = Column(String, nullable=False)
