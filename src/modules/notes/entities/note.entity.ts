import { MyBaseEntity } from 'src/base/entities/base.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('notes')
export class Note extends MyBaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Category, (category) => category.notes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.notes)
  @JoinTable({ name: 'note_tags' })
  tags: Tag[];
}
