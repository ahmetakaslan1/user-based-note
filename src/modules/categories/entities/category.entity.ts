import { MyBaseEntity } from 'src/base/entities/base.entity';
import { Note } from 'src/modules/notes/entities/note.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';

@Entity('categories')
@Unique(['name', 'user'])
export class Category extends MyBaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Note, (note) => note.category)
  notes: Note[];
}
