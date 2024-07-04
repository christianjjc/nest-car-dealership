import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.getAll();
  }

  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.carsService.getById(id);
  }

  @Post()
  createCar(@Body() createCarDTO: CreateCarDTO) {
    return this.carsService.create(createCarDTO);
  }

  @Patch(':id')
  updateCar(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() body: CreateCarDTO) {
    return {
      body,
      method: 'patch',
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return {
      id,
      method: 'delete',
    };
  }
}
