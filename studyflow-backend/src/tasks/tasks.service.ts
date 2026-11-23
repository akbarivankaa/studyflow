
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  private nextId = 1;

  // CREATE: Menambahkan tugas baru
  create(createTaskDto: CreateTaskDto): Task {
    const title = createTaskDto.title.trim();
    const course = createTaskDto.course.trim();

    this.ensureUnique(title, course);

    const newTask: Task = {
      id: this.nextId++,
      title,
      course,
      deadline: createTaskDto.deadline,
      priority: createTaskDto.priority,
      status: createTaskDto.status ?? 'Belum dikerjakan',
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);

    return newTask;
  }

  // READ: Menampilkan seluruh tugas
  findAll(): Task[] {
    return [...this.tasks];
  }

  // READ: Menampilkan satu tugas berdasarkan ID
  findOne(id: number): Task {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) {
      throw new NotFoundException(
        `Tugas dengan ID ${id} tidak ditemukan.`,
      );
    }

    return task;
  }

  // UPDATE: Memperbarui tugas berdasarkan ID
  update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Task {
    const existingTask = this.findOne(id);

    const title =
      updateTaskDto.title?.trim() ?? existingTask.title;

    const course =
      updateTaskDto.course?.trim() ?? existingTask.course;

    this.ensureUnique(title, course, id);

    const updatedTask: Task = {
      ...existingTask,
      ...updateTaskDto,
      title,
      course,
    };

    this.tasks = this.tasks.map((item) =>
      item.id === id ? updatedTask : item,
    );

    return updatedTask;
  }

  // DELETE: Menghapus tugas berdasarkan ID
  remove(id: number): {
    message: string;
    deletedTask: Task;
  } {
    const task = this.findOne(id);

    this.tasks = this.tasks.filter(
      (item) => item.id !== id,
    );

    return {
      message: `Tugas "${task.title}" berhasil dihapus.`,
      deletedTask: task,
    };
  }

  // Memeriksa duplikasi judul dan mata kuliah
  private ensureUnique(
    title: string,
    course: string,
    excludedId?: number,
  ): void {
    const duplicate = this.tasks.some(
      (task) =>
        task.id !== excludedId &&
        task.title.toLowerCase() === title.toLowerCase() &&
        task.course.toLowerCase() === course.toLowerCase(),
    );

    if (duplicate) {
      throw new ConflictException(
        'Tugas dengan judul dan mata kuliah tersebut sudah terdaftar.',
      );
    }
  }
}
