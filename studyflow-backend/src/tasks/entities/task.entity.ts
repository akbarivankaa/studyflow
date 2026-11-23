
export type TaskPriority = 'Rendah' | 'Sedang' | 'Tinggi';

export type TaskStatus =
  | 'Belum dikerjakan'
  | 'Sedang dikerjakan'
  | 'Selesai';

export class Task {
  id!: number;

  title!: string;

  course!: string;

  deadline!: string;

  priority!: TaskPriority;

  status!: TaskStatus;

  createdAt!: string;
}
