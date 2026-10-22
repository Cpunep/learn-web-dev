from datetime import datetime


class Appointment:
    def __init__(self, appointment_id: int, client_name: str,
                 master_id: int, service_id: int, time: str):
        self.id = appointment_id
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time

    def __repr__(self) -> str:
        return (f"Appointment(id={self.id}, client={self.client_name!r}, "
                f"master={self.master_id}, service={self.service_id}, time={self.time!r})")


class Master:
    def __init__(self, master_id): self.master_id = master_id


class Service:
    def __init__(self, service_id): self.service_id = service_id


def get_master(master_id: int) -> Master | None:
    return Master(master_id) if master_id > 0 else None


def get_service(service_id: int) -> Service | None:
    return Service(service_id) if service_id > 0 else None


appointments: list[Appointment] = []

WORK_START = 8  # 08:00
WORK_END = 20  # 20:00


# Создаёт запись клиента. Возвращает None, если данные некорректны.
def create_appointment(client_name: str,
                       master_id: int,
                       service_id: int,
                       time: str,
                       ) -> Appointment | None:
    if not client_name or not client_name.strip():
        return None
    if not master_id or not service_id or not time:
        return None

    master = get_master(master_id)
    service = get_service(service_id)
    if master is None or service is None:
        return None
    try:
        appointment_time = datetime.strptime(time, "%H:%M").time()
    except (ValueError, TypeError):
        print("Неправильный формат времени. Попробуйте ЧЧ:ММ")
        return None

    if not (WORK_START <= appointment_time.hour < WORK_END):
        print("Мы работаем с 8:00 до 20:00")
        return None

    appointment = Appointment(
        appointment_id=len(appointments) + 1,
        client_name=client_name,
        master_id=master.master_id,
        service_id=service.service_id,
        time=time,
    )
    appointments.append(appointment)
    return appointment


while True:
    print("-------------------------")
    print("Выберите действие")
    print("1. Добавить 2 действительные записи и вывести")
    print("2. Попробовать записаться в полночь и вывести число записей")
    print("3. Ручной режим")
    print("4. Вывести записи")
    print("5. Очистить записи")
    print("6. Выход")
    print("-------------------------")
    try:
        choose = int(input("Ваш выбор: "))
    except (ValueError, TypeError):
        print("Некорректный ввод. Пожалуйста, введите цифру 1-4")
        pass
    else:
        match int(choose):
            case 1:
                first_appointment = create_appointment("Иванова А.А.", 1, 1, '10:00')
                second_appointment = create_appointment("Петрова А.А.", 1, 1, '11:00')
                print("Список записей:")
                for appointment in appointments:
                    print(appointment.client_name, appointment.time)
            case 2:
                no_correct_appointment = create_appointment("Сидорова А.А.", 1, 1, '00:00')
                print(f"Число записей: {len(appointments)}")
            case 3:
                new_client_name = input("Введите имя: ")
                new_client_time = input("Введите время: ")
                new_appointment = create_appointment(new_client_name, 1, 1, new_client_time, )
                for appointment in appointments:
                    print(appointment.client_name, appointment.time)
            case 4:
                print("Список записей:")
                for appointment in appointments:
                    print(appointment.client_name, appointment.time)
            case 5:
                appointments.clear()
                print(f"Записей: {len(appointments)}")
            case 6:
                break
            case _:
                print("Некорректный ввод. Пожалуйста, введите цифру 1-4")
