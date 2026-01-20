import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  // TODO Note : Burada Category ve Tag'ı import etmemizin sebebi
  // TODO Note : NotesService içinde Category ve Tag entity'lerini Reposiztoy
  // TODO Note : olarak kullanmamızdır. Önceden Belirtmemiz gerekir.
  // TODO Note : Repository'ler  o tabloyla konuşan özel bir sorumludur. 

  imports: [TypeOrmModule.forFeature([Note, Category, Tag])],

  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
