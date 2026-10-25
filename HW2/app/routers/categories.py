from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.models import CategoryWithCount
from app.repository import category_repo, service_repo

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryWithCount])
def list_categories() -> list[CategoryWithCount]:
    counts = service_repo.count_by_category()
    return [
        CategoryWithCount(
            id=category.id,
            name=category.name,
            services_count=counts.get(category.id, 0),
        )
        for category in category_repo.list_all()
    ]


@router.get("/{category_id}", response_model=CategoryWithCount)
def get_category(category_id: int) -> CategoryWithCount:


    category = category_repo.get_by_id(category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")

    counts = service_repo.count_by_category()
    return CategoryWithCount(
        id=category.id,
        name=category.name,
        services_count=counts.get(category.id, 0),
    )
