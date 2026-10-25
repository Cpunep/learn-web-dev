from __future__ import annotations

from collections import defaultdict

from app.models import Category, Service

CATEGORIES: list[Category] = [
    Category(id=1, name="Стрижки и укладки"),
    Category(id=2, name="Маникюр и педикюр"),
    Category(id=3, name="Брови и ресницы"),
    Category(id=4, name="Спа-процедуры"),
]

SERVICES: list[Service] = [
    Service(id=1, name="Стрижка женская", category_id=1, price=1500.0),
    Service(id=2, name="Укладка", category_id=1, price=1200.0),
    Service(id=3, name="Маникюр", category_id=2, price=1000.0),
    Service(id=4, name="Педикюр", category_id=2, price=1400.0),
    Service(id=5, name="Коррекция бровей", category_id=3, price=800.0),
    Service(id=6, name="Массаж лица", category_id=4, price=2500.0),
]


class CategoryRepository:

    # Репозиторий категорий услуг

    def list_all(self) -> list[Category]:
        # Возвращает все категории в порядке объявления
        return list(CATEGORIES)

    def get_by_id(self, category_id: int) -> Category | None:
        return next((c for c in CATEGORIES if c.id == category_id), None)

class ServiceRepository:

    # Репозиторий услуг

    def count_by_category(self) -> dict[int, int]:
        counts: dict[int, int] = defaultdict(int)
        for service in SERVICES:
            counts[service.category_id] += 1
        return dict(counts)


# Готовые экземпляры для внедрения в роутеры.

category_repo = CategoryRepository()
service_repo = ServiceRepository()
