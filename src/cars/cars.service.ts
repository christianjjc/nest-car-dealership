import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Nissan', model: 'SkyLine' },
    { id: 3, brand: 'Hyundai', model: 'Creta' },
  ];

  public getAll() {
    return this.cars;
  }

  public getById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id:'${id}' not Found.`);
    return car;
  }
}
