import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  create(@Body() createNoteDto: CreateNoteDto, @CurrentUser() user: User) {
    return this.notesService.create(createNoteDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all my notes' })
  findAll(@CurrentUser() user: User) {
    return this.notesService.findAll(user); 
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific note by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.notesService.findOne(+id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note' })
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @CurrentUser() user: User,
  ) {
    return this.notesService.update(+id, updateNoteDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note (Soft delete)' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.notesService.remove(+id, user);
  }
}
