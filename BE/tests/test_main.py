from fastapi.testclient import TestClient
from app.models import Base, Device, DataPoint
from app.database import engine, SessionLocal
from main import app
import os

# Create a TestClient instance to send requests to the FastAPI application
client = TestClient(app)

# Override the database URL for testing
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test_test.db"
Base.metadata.create_all(bind=engine)

# Define setup and teardown functions for tests
def setup_module(module):
    pass

def teardown_module(module):
    os.remove("test_test.db")

# Define test cases for each API endpoint

def test_add_data():
    response = client.post(
        "/add-data",
        json={"device_id": 1, "parameter": "test_param", "value": "test_value", "type": "test_type"},
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Data added successfully"}

def test_get_device_data():
    response = client.get("/devices/1")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_all_data_points():
    response = client.get("/data-points")
    assert response.status_code == 200
    assert response.json() == "Data points saved to database successfully"

def test_get_all_data():
    response = client.get("/all-data")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

