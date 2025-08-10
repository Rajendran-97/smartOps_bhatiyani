from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models, schemas, crud
from database import SessionLocal, engine, Base
import json, pathlib
from fastapi.responses import JSONResponse

BASE_DIR = pathlib.Path(__file__).resolve().parent

# Create tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS so frontend can access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://smart-ops-bhatiyani.vercel.app/"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ===========================
# API ROUTES
# ===========================

@app.get("/dashboard")
def get_dashboard():
    try:
        data = json.loads((BASE_DIR / "db.json").read_text())
        return JSONResponse(content=data.get("dashboard", {}))
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/insights")
def get_insights():
    try:
        data = json.loads((BASE_DIR / "db.json").read_text())
        return JSONResponse(content=data.get("insights", []))
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/")
def read_root():
    return {"message": "SmartOps Backend is running"}


# Get all metrics
@app.get("/metrics", response_model=list[schemas.Metric])
def get_all_metrics(db: Session = Depends(get_db)):
    return crud.get_metrics(db)


# Get a single metric by ID
@app.get("/metrics/{metric_id}", response_model=schemas.Metric)
def get_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = crud.get_metric(db, metric_id)
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")
    return metric


# Create a new metric
@app.post("/metrics", response_model=schemas.Metric)
def create_metric(metric: schemas.MetricCreate, db: Session = Depends(get_db)):
    return crud.create_metric(db, metric)


# Update an existing metric
@app.put("/metrics/{metric_id}", response_model=schemas.Metric)
def update_metric(metric_id: int, updated_data: schemas.MetricCreate, db: Session = Depends(get_db)):
    metric = crud.update_metric(db, metric_id, updated_data)
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")
    return metric


# Delete a metric
@app.delete("/metrics/{metric_id}", response_model=schemas.Metric)
def delete_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = crud.delete_metric(db, metric_id)
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")
    return metric
