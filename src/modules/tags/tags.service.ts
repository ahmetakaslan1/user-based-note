import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto, user: User) {
    const existingTag = await this.tagsRepository.findOne({
      where: { name: createTagDto.name, user: { id: user.id } },
    });

    if (existingTag) {
      throw new ConflictException(
        `Tag '${createTagDto.name}' already exists for this user`,
      );
    }

    const tag = this.tagsRepository.create({
      ...createTagDto,
      user,
    });
    return await this.tagsRepository.save(tag);
  }

  async findAll(user: User) {
    return await this.tagsRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user: User) {
    const tag = await this.tagsRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!tag) {
      throw new NotFoundException(`Tag #${id} not found`);
    }

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto, user: User) {
    const tag = await this.findOne(id, user);

    if (updateTagDto.name) {
      const existingTag = await this.tagsRepository.findOne({
        where: { name: updateTagDto.name, user: { id: user.id } },
      });

      if (existingTag && existingTag.id !== id) {
        throw new ConflictException(
          `Tag '${updateTagDto.name}' already exists`,
        );
      }
    }

    Object.assign(tag, updateTagDto);
    return await this.tagsRepository.save(tag);
  }

  async remove(id: number, user: User) {
    const tag = await this.findOne(id, user);
    return await this.tagsRepository.softRemove(tag);
  }
}
