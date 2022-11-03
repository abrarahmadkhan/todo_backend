import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './List.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepo: Repository<List>,
  ) {}
  findAll(): Promise<List[]> {
    return this.listRepo.find();
  }
  create(newList): Promise<List> {
    const { Status, Job_Title, Description }: List = newList;
    const list = new List();
    list.Status = Status;
    list.Job_Title = Job_Title;
    list.created_at = new Date();
    list.updated_at = new Date();
    list.Description = Description;
    console.log(list);
    return this.listRepo.save(list);
  }
  findListbyId(list_id: number) {
    return this.listRepo.findOneBy({ list_id });
  }

  update(listtoUpdate: List) {
    this.listRepo.update(listtoUpdate.list_id, listtoUpdate);
  }

  delete(list_id) {
    this.listRepo.delete(list_id);
  }
}
