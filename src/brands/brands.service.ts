import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { v4 as uuid } from 'uuid';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((b) => b.id === id);
    if (!brand) throw new NotFoundException(`Brand with id:'${id}' not Found.`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandBD = this.findOne(id);
    // if (updateBrandDto.id && updateBrandDto.id !== id) {
    //   throw new BadRequestException('id arrived is not valid');
    // }
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandBD = { ...brandBD, ...updateBrandDto, id };
        return brandBD;
      }
      return brand;
    });
    return brandBD;
  }

  remove(id: string) {
    this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return {
      id,
      deleted: true,
    };
  }
}
