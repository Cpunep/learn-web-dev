from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class Service(BaseModel):
    id: int
    name: str
    category_id: int
    price: float


class Category(BaseModel):
    id: int
    name: str


class CategoryWithCount(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: int
    name: str
    services_count: int = Field(alias="servicesCount")


class MasterOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    specialization: str
