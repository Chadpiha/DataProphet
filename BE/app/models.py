from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Device(Base):
    __tablename__ = "devices"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    data = relationship("DataPoint", back_populates="device")

class DataPoint(Base):
    __tablename__ = "data_points"
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey('devices.id'))
    parameter = Column(String, index=True)
    timestamp = Column(DateTime, index=True, default=datetime.now)
    value = Column(String)
    type = Column(String)
    device = relationship("Device", back_populates="data")
