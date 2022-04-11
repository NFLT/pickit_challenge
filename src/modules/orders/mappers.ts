import { ServiceDto, OrderDto } from './dtos';

class OrderMapper {
    toOrderDto(orderEntity: any, serviceEntities?: any[]) {
        const orderDto: OrderDto = {
            number: orderEntity.id_orden,
            status: orderEntity.estado_descripcion,
            date: orderEntity.fecha,
            total: orderEntity.total,
            ownerFullName: `${ orderEntity.propietario_apellido }, ${orderEntity.propietario_nombre}`,
            carBrand: orderEntity.auto_marca,
            carModel: orderEntity.auto_modelo,
            carColor: orderEntity.auto_color,
            carYear: orderEntity.auto_anio,
            carPlate: orderEntity.auto_patente,
        }

        if (serviceEntities){
            orderDto.details = serviceEntities.map((serviceEntity: any) => {
                return this.toServiceDto(serviceEntity);
            });
        }
        return orderDto;
    }

    toServiceDto(serviceEntity: any): ServiceDto {
        const serviceDto: ServiceDto = {
            code: serviceEntity.id_servicio,
            service: serviceEntity.servicio_descripcion,
            total: serviceEntity.detalle_importe
        }
        return serviceDto
    }
}

export default new OrderMapper();

