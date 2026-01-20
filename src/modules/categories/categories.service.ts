import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, user: User) {
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name: createCategoryDto.name, user: { id: user.id } },
    });

    if (existingCategory) {
      throw new ConflictException(
        `Category '${createCategoryDto.name}' already exists for this user`,
      );
    }

    const category = this.categoriesRepository.create({
      // TODO NOTE : Buradki olay createCategoryDto birden fazla propert var.
      // TODO NOTE : ...createCategoryDto ile createCategoryDto'daki tüm property'ler tek tek
      // TODO NOTE : category objesine atanır.
      ...createCategoryDto,
      user,
    });
    return await this.categoriesRepository.save(category);
  }

  async findAll(user: User) {
    return await this.categoriesRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user: User) {
    const category = await this.categoriesRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, user: User) {
    const category = await this.findOne(id, user);

    if (updateCategoryDto.name) {
      const existingCategory = await this.categoriesRepository.findOne({
        where: { name: updateCategoryDto.name, user: { id: user.id } },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException(
          `Category '${updateCategoryDto.name}' already exists`,
        );
      }
    }

    Object.assign(category, updateCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  async remove(id: number, user: User) {
    const category = await this.findOne(id, user);
    return await this.categoriesRepository.softRemove(category);
  }
}
