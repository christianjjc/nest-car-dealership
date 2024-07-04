import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Nissan', model: 'SkyLine' },
    { id: uuid(), brand: 'Hyundai', model: 'Creta' },
  ];

  public getAll() {
    return this.cars;
  }

  public getById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id:'${id}' not Found.`);
    return car;
  }

  public create(createCarDTO: CreateCarDTO) {
    const car: Car = {
      id: uuid(),
      ...createCarDTO,
    };
    this.cars.push(car);
    return car;
  }
}
