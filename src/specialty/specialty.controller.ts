import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ISpecialtyService } from './interfaces/specialty.service.interface';	
import { ReadSpecialtyDto } from './dtos/readSpecialty.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('specialty')
export class SpecialtyController {
    constructor(@Inject('ISpecialtyService') private readonly specialtyService : ISpecialtyService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllSpecialtyAsync() : Promise<ReadSpecialtyDto[]> {
        return await this.specialtyService.getAllSpecialtyAsync();
    }
}
