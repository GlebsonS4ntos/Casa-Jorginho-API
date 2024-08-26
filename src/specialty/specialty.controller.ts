import { Controller, Get } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { ReadSpecialtyDto } from './dtos/readSpecialty.dto';

@Controller('specialty')
export class SpecialtyController {
    constructor(private readonly specialtyService : SpecialtyService){}

    @Get()
    async getAllSpecialtyAsync() : Promise<ReadSpecialtyDto[]> {
        return this.specialtyService.getAllSpecialtyAsync();
    }
}
