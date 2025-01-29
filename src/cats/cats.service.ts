import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async findAll() {
    return this.catsRepository.find();
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsRepository.save(createCatDto);
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catsRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    await this.catsRepository.update(id, updateCatDto);
    return await this.catsRepository.findOne({ where: { id } });
  }

  async exportCats(id: number) {
    const cat = await this.catsRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<String> {
    if (isNaN(id)) {
      throw new BadRequestException(`The provided ID ${id} is invalid`);
    }
    const userToDelete = await this.catsRepository.findOne({
      where: [{ id: id }],
    });
    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.catsRepository.remove(userToDelete);
    return `User with ID ${id} deleted`;
  }
}
