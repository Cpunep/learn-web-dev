from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.main import app

@pytest.fixture()
def client() -> TestClient:
    return TestClient(app)

def test_list_categories_status_and_shape(client: TestClient) -> None:
    response = client.get("/categories")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 4

# контракт: id, name, servicesCount (camelCase)

    for item in data:
        assert set(item.keys()) == {"id", "name", "servicesCount"}
        assert isinstance(item["servicesCount"], int)

def test_list_categories_counts_match_services(client: TestClient) -> None:
    data = client.get("/categories").json()
    by_id = {c["id"]: c for c in data}
    assert by_id[1]["servicesCount"] == 2
    assert by_id[2]["servicesCount"] == 2
    assert by_id[3]["servicesCount"] == 1
    assert by_id[4]["servicesCount"] == 1

def test_get_category_success(client: TestClient) -> None:
    response = client.get("/categories/1")
    assert response.status_code == 200
    assert response.json() == {
    "id": 1,
    "name": "Стрижки и укладки",
    "servicesCount": 2,
    }

def test_get_category_not_found(client: TestClient) -> None:
    response = client.get("/categories/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Category not found"}

def test_get_category_invalid_id_type(client: TestClient) -> None:

# FastAPI отклонит нечисловой id в пути и вернёт 422.

    response = client.get("/categories/abc")
    assert response.status_code == 422