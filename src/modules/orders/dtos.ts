export interface ServiceDto {
    code: number,
    service: string,
    total: number
}

export interface OrderDto {
    number: number,
    status: string,
    date: string,
    total: number,
    ownerFullName: string,
    carBrand: string,
    carModel: string,
    carColor: string,
    carYear: number,
    carPlate: string,
    details?: ServiceDto[]
}