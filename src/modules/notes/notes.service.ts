import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async create(createNoteDto: CreateNoteDto, user: User) {
    // ------------------------
    //TODO Note : burada bizler categoryId ve tagIds üzerinde direkt olarak
    //TODO Note : işlemeler yapacaz bu yüzden ayırdık. ...noteData ise geri kalan ne varsa
    //TODO Note : buraya ekle. Pratik bir yöntemdir.
    //?         :  Kısacası
    //TODO Note : categoryId: Sadece kategori ID'si (Örn: 5)
    //TODO Note : tagIds: Sadece etiket ID'leri (Örn: [1, 2])
    //TODO Note : noteData: Geriye kalan her şey (Title ve Content)
    // -------------------------
    const { categoryId, tagIds, ...noteData } = createNoteDto;

    if (categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category #${categoryId} not found`);
      }
    }

    if (tagIds) {
      const tags = await this.tagsRepository.find({
        where: { id: In(tagIds) },
        //-----------------------------
        //TODO Note :Burada liste içindeki eleman sayısı kadar  veritabanına sormak gerekir (bu yavaştır). Bu yüzden
        //TODO Note : In() metodu, bir dizi içindeki ID'lere sahip olanları bulmak için kullanılır.
        //TODO Note : Örnek: tagIds = [1, 2, 3] ise, bu metot sadece ID'si 1, 2 veya 3 olan etiketleri getirir.
        //-----------------------------
      });
      if (tags.length !== tagIds.length) {
        throw new NotFoundException(`Some tags not found`);
      }
    }

    const note = this.notesRepository.create({
      ...noteData,
      //-----------------------------
      //TODO Note : Burada  const { categoryId, tagIds, ...noteData } = createNoteDto; fonksiyonunda
      //TODO Note : categoryId ve tagIds  i atama yaptık ve geri kalanları oratk bir sepete almak gibi düşünün.
      //TODO Note : Title ve Content'i aynen koy dedik.
      //-----------------------------
      user, //! Notun sahibi kim? sorusunun cevabı.
      category: categoryId ? { id: categoryId } : undefined,
      tags: tagIds ? tagIds.map((id) => ({ id })) : [],
    });

    return await this.notesRepository.save(note);
  }

  async findAll(user: User) {
    return await this.notesRepository.find({
      where: { user: { id: user.id } },
      relations: ['category', 'tags'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user: User) {
    const note = await this.notesRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ['category', 'tags'],
    });

    if (!note) {
      throw new NotFoundException(`Note #${id} not found`);
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, user: User) {
    const note = await this.findOne(id, user);

    const { categoryId, tagIds, ...updateData } = updateNoteDto;

    Object.assign(note, updateData);

    if (categoryId !== undefined) {
      if (categoryId) {
        const category = await this.categoriesRepository.findOne({
          where: { id: categoryId },
        });
        if (!category) {
          throw new NotFoundException(`Category #${categoryId} not found`);
        }
      }
      note.category = categoryId ? ({ id: categoryId } as any) : null;
    }

    if (tagIds !== undefined) {
      note.tags = tagIds.map((id) => ({ id })) as any;
    }

    return await this.notesRepository.save(note);
  }

  async remove(id: number, user: User) {
    const note = await this.findOne(id, user); // Ensures ownership
    return await this.notesRepository.softRemove(note);
  }
}
