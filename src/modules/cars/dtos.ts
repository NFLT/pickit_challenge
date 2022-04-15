export interface CarDto {
    idOwner: number,
    ownerFullName: string,
    idCar: number,
    carBrand: string,
    carModel: string,
    carYear: number,
    carColor: string,
    carPlate: string
}

export interface CarHistoryItemDto {
    idOrder: number,
    date: string,
    state: string,
    service: string,
    total: number
}