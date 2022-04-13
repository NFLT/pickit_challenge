import {OwnerDto, OwnerCarDto} from "./dtos";

class OwnerMapper {
    toOwnerDto(owner: any) {
        const ownerDto: OwnerDto = {
            idOwner: parseInt(owner.id_propietario),
            name: owner.nombre,
            surname: owner.apellido,
        };
        return ownerDto;
    }

    toCarDto(car: any){
        const carDto: OwnerCarDto = {
            idCar: car.id_auto,
            carBrand: car.marca,
            carModel: car.modelo,
            carColor: car.color,
            carPlate: car.patente,
            carYear: car.anio
        }

        return carDto;
    }
}

export default new OwnerMapper();