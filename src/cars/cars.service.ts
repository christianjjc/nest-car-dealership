import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';

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

  public update(id: string, updateCarDTO: UpdateCarDTO) {
    let carBD = this.getById(id);

    if (updateCarDTO.id && updateCarDTO.id !== id) {
      throw new BadRequestException('id arrived is not valid');
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carBD = { ...carBD, ...updateCarDTO, id };
        return carBD;
      }
      return car;
    });
    return carBD;
  }

  public delete(id: string) {
    this.getById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return {
      id,
      deleted: true,
    };
  }
}
