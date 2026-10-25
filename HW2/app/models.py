from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class Service(BaseModel):
    # Услуга салона
    id: int
    name: str
    category_id: int
    price: float


class Category(BaseModel):
    # Категория услуг без агрегатов (для внутреннего хранения)

    id: int
    name: str


class CategoryWithCount(BaseModel):
    # Категория услуг вместе с количеством услуг в ней

    model_config = ConfigDict(populate_by_name=True)

    id: int
    name: str
    services_count: int = Field(alias="servicesCount")
