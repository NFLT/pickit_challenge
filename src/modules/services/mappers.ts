import { ServiceDto } from './dtos';

class ServiceMapper {
    toServiceDto(service: any) {
        const serviceDto: ServiceDto = {
            idService: service.id_servicio,
            description: service.descripcion,
            total: service.importe
        }

        return serviceDto;
    }
};

export default new ServiceMapper();