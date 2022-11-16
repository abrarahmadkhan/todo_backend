import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from './List.controller';
import { List } from './List.entity';
import { ListService } from './List.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
