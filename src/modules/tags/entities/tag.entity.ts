import { MyBaseEntity } from 'src/base/entities/base.entity';
import { Note } from 'src/modules/notes/entities/note.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('tags')
export class Tag extends MyBaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.tags, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}
