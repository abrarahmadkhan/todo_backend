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
  async findAllDataByPageAndRows(
    page: number,
    rows: number,
    status: string,
  ): Promise<any> {
    try {
      const Page = page * rows;
      if (status.length == 0) {
        const response = await this.listRepo.findAndCount({
          // where: [{ Status: status[0] }],
          take: rows,
          skip: Page,
        });

        return response;
      }
      if (status.length == 1) {
        const response = await this.listRepo.findAndCount({
          where: [{ Status: status[0] }],
          take: rows,
          skip: Page,
        });

        return response;
      }
      if (status.length == 2) {
        const response = await this.listRepo.findAndCount({
          where: [{ Status: status[0] }, { Status: status[1] }],
          take: rows,
          skip: Page,
        });

        return response;
      }
      if (status.length == 3) {
        const response = await this.listRepo.findAndCount({
          where: [
            { Status: status[0] },
            { Status: status[1] },
            { Status: status[2] },
          ],
          take: rows,
          skip: Page,
        });

        return response;
      }
      if (status.length == 4) {
        const response = await this.listRepo.findAndCount({
          where: [
            { Status: status[0] },
            { Status: status[1] },
            { Status: status[2] },
            { Status: status[3] },
          ],
          take: rows,
          skip: Page,
        });

        return response;
      }
      if (status.length == 5) {
        const response = await this.listRepo.findAndCount({
          where: [
            { Status: status[0] },
            { Status: status[1] },
            { Status: status[2] },
            { Status: status[3] },
            { Status: status[4] },
          ],
          take: rows,
          skip: Page,
        });

        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async create(newList): Promise<List> {
    const { Status, Job_Title, Description, employeeListId }: List = newList;
    const list = new List();
    list.Status = Status;
    list.Job_Title = Job_Title;
    list.created_at = new Date();
    list.updated_at = new Date();
    list.Description = Description;
    list.employee = employeeListId;
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
