import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Tags')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({
    summary: 'Create a new tag',
    description: 'Creates a new tag for the authenticated user.',
  })
  @Post()
  create(@Body() createTagDto: CreateTagDto, @CurrentUser() user: User) {
    return this.tagsService.create(createTagDto, user);
  }

  @ApiOperation({ summary: 'Get all tags' })
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.tagsService.findAll(user);
  }

  @ApiOperation({ summary: 'Get a tag by ID' })
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.tagsService.findOne(+id, user);
  }

  @ApiOperation({ summary: 'Update a tag' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
    @CurrentUser() user: User,
  ) {
    return this.tagsService.update(+id, updateTagDto, user);
  }

  @ApiOperation({ summary: 'Delete a tag' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.tagsService.remove(+id, user);
  }
}
