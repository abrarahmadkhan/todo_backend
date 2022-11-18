import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { List } from './List.entity';
import { ListService } from './List.service';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}
  @Get()
  async getAll(): Promise<List[]> {
    return await this.listService.findAll();
  }
  @Post()
  async getAllDataByPageAndRows(
    @Body('page') page,
    @Body('rows') rows,
    @Body('Status') Status,
  ): Promise<any> {
    return await this.listService.findAllDataByPageAndRows(page, rows, Status);
  }
  @Get(':id')
  @HttpCode(200)
  getEmployee(@Param('id') id) {
    try {
      return this.listService.findListbyId(id);
    } catch (e) {
      console.log(e);
    }
  }
  @Put()
  @HttpCode(201)
  createEmployee(@Body() newlist: List) {
    try {
      return this.listService.create(newlist);
    } catch (e) {
      console.log(e);
    }
  }
  @Post(':id')
  @HttpCode(200)
  updateEmployee(@Body() listToUpdate: List) {
    try {
      return this.listService.update(listToUpdate);
    } catch (e) {
      console.log(e);
    }
  }
  @Delete(':id')
  @HttpCode(200)
  deleteEmployee(@Param('id') id) {
    try {
      return this.listService.delete(id);
    } catch (e) {
      console.log(e);
    }
  }
}
