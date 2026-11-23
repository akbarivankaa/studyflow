
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import type {
  TaskPriority,
  TaskStatus,
} from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  course!: string;

  @IsDateString()
  deadline!: string;

  @IsIn(['Rendah', 'Sedang', 'Tinggi'])
  priority!: TaskPriority;

  @IsOptional()
  @IsIn([
    'Belum dikerjakan',
    'Sedang dikerjakan',
    'Selesai',
  ])
  status?: TaskStatus;
}
