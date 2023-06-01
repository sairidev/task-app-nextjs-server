import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async create(createTask: CreateTaskDTO): Promise<Task> {
    const newTask = new this.taskModel(createTask);
    return await newTask.save();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async delete(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, task: UpdateTaskDTO): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}
