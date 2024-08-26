import { Controller, Get, Inject } from '@nestjs/common';
import { ISpecialtyService } from './interfaces/specialty.service.interface';	
import { ReadSpecialtyDto } from './dtos/readSpecialty.dto';

@Controller('specialty')
export class SpecialtyController {
    constructor(@Inject('ISpecialtyService') private readonly specialtyService : ISpecialtyService){}

    @Get()
    async getAllSpecialtyAsync() : Promise<ReadSpecialtyDto[]> {
        return await this.specialtyService.getAllSpecialtyAsync();
    }
}
