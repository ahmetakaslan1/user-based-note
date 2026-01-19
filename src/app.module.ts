import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';
import { NotesModule } from './modules/notes/notes.module';
import { User } from './modules/users/entities/user.entity';
import { Note } from './modules/notes/entities/note.entity';
import { Category } from './modules/categories/entities/category.entity';
import { Tag } from './modules/tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'nestjs_user',
      database: 'nestjs_db',
      password: 'nestjs_2026',
      entities: [User, Note, Category, Tag],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    TagsModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
