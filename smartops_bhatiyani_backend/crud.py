from sqlalchemy.orm import Session
import models, schemas

# Fetch all metrics
def get_metrics(db: Session):
    return db.query(models.Metric).all()

# Fetch a single metric by ID
def get_metric(db: Session, metric_id: int):
    return db.query(models.Metric).filter(models.Metric.id == metric_id).first()

# Create a new metric
def create_metric(db: Session, metric: schemas.MetricCreate):
    db_metric = models.Metric(name=metric.name, value=metric.value)
    db.add(db_metric)
    db.commit()
    db.refresh(db_metric)
    return db_metric
# Update an existing metric by ID
def update_metric(db: Session, metric_id: int, updated_data: schemas.MetricCreate):
    db_metric = get_metric(db, metric_id)
    if db_metric:
        db_metric.name = updated_data.name
        db_metric.value = updated_data.value
        db.commit()
        db.refresh(db_metric)
    return db_metric

# Delete a metric by ID
def delete_metric(db: Session, metric_id: int):
    db_metric = get_metric(db, metric_id)
    if db_metric:
        db.delete(db_metric)
        db.commit()
    return db_metric
