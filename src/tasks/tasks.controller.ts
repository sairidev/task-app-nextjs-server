import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ConflictException,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    if (!task) throw new NotFoundException('Task does not exist!');

    return task;
  }

  @Post()
  async create(@Body() body: CreateTaskDTO) {
    try {
      return await this.tasksService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists.');
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const task = await this.tasksService.delete(id);

    if (!task) throw new NotFoundException('Task does not exist!');

    return task;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDTO) {
    const task = await this.tasksService.update(id, body);

    if (!task) throw new NotFoundException('Task does not exist!');

    return task;
  }
}
