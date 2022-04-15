import { CarDto, CarHistoryItemDto } from './dtos';

class carMapper {
    toCarDto(car: any) {
        const carDto: CarDto = {
            idOwner: car.id_propietario,
            ownerFullName: `${ car.propietario_apellido }, ${ car.propietario_nombre }`,
            idCar: car.id_auto,
            carBrand: car.auto_marca,
            carModel: car.auto_modelo,
            carYear: car.auto_anio,
            carColor: car.auto_color,
            carPlate: car.auto_patente
        };

        return carDto;
    }

    toCarHistoryItemDto(carHistoryItem: any) {
        const carHistoryItemDto : CarHistoryItemDto = {
            idOrder: carHistoryItem.id_orden,
            date: carHistoryItem.orden_fecha,
            state: carHistoryItem.orden_estado,
            service: carHistoryItem.detalle_servicio,
            total: carHistoryItem.detalle_importe
        }

        return carHistoryItemDto;
    }
}

export default new carMapper();