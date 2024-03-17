from fastapi import Depends, FastAPI, HTTPException
from app.database import engine, SessionLocal
from sqlalchemy.orm import sessionmaker, Session, relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import json
import os
from fastapi.middleware.cors import CORSMiddleware
from app.models import Base, Device, DataPoint

# FastAPI Application
app = FastAPI()

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Whitelist of allowed origins (frontend URL)
    allow_credentials=True,  # Allow credentials such as cookies
    allow_methods=["GET", "POST"],  # Allowed HTTP methods
    allow_headers=["*"],  # Allowed HTTP headers
)

# Custom Exception for data processing errors
class DataProcessingError(Exception):
    def __init__(self, detail: str):
        self.detail = detail

# Custom Exception for database errors
class DatabaseError(Exception):
    def __init__(self, detail: str):
        self.detail = detail

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Function to add data
def add_data(device_id: int, parameter: str, value: str, type: str, db: Session = Depends(get_db)):
    try:
        timestamp = datetime.now()
        db_data = DataPoint(device_id=device_id, parameter=parameter, timestamp=timestamp, value=value, type=type)
        db.add(db_data)
        db.commit()
        return {"message": "Data added successfully"}
    except Exception as e:
        db.rollback()
        raise DatabaseError(f"Error adding data: {str(e)}")
    finally:
        db.close()

# API Endpoint to add data
@app.post("/add-data")
async def add_data_endpoint(device_id: int, parameter: str, value: str, type: str, db: Session = Depends(get_db)):
    try:
        return add_data(db, device_id, parameter, value, type)
    except DatabaseError as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to read data points from JSON file and save them to database
def read_and_save_data(file_path: str):
    try:
        db = SessionLocal()
        with open(file_path, 'r') as file:
            data = json.load(file)
            for device_name, entries in data.items():
                device = Device(name=device_name)
                db.add(device)
                db.flush()  # Ensure device has an ID before adding data points
                for entry in entries:
                    # Parse timestamp string to datetime object
                    timestamp = datetime.fromisoformat(entry["timestamp"])
                    # Create DataPoint object and add to the database session
                    db_data_point = DataPoint(
                        device_id=device.id,
                        parameter=entry["parameter"],
                        timestamp=timestamp,
                        value=entry["value"],
                        type=entry["type"]
                    )
                    db.add(db_data_point)
            db.commit()
    except Exception as e:
        db.rollback()
        raise DataProcessingError(f"Error reading and saving data: {str(e)}")
    finally:
        db.close()

# Endpoint to read the JSON file
@app.get("/read-file", response_model=str)
async def get_all_data_points(file_name: str = "sample.json"):
    """
    Get all data points from the JSON file located in the project's root directory and save them to the database.
    """
    file_path = os.path.join(os.getcwd(), file_name)
    read_and_save_data(file_path)
    return "Data points saved to database successfully"

# Get all data endpoint
@app.get("/all-data")
async def get_all_data_points(db: Session = Depends(get_db)):
    """
    Get all data points from the database.
    """
    db = SessionLocal()
    try:
        data_points = db.query(DataPoint).all()

        # Organize data points by device
        device_data = {}
        for data_point in data_points:
            device_id = data_point.device_id
            if device_id not in device_data:
                device_data[device_id] = []
            device_data[device_id].append({
                "parameter": data_point.parameter,
                "timestamp": data_point.timestamp.isoformat(),
                "value": data_point.value,
                "type": data_point.type
            })

        return device_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving data: {str(e)}")
    finally:
        db.close()
