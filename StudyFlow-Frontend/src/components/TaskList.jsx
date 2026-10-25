import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  totalTasks,
  onUpdateStatus,
  onDeleteTask,
}) {
  if (totalTasks === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📭</span>
        <h3>Belum ada data tugas</h3>
        <p>Tambahkan tugas pertamamu melalui formulir.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🔎</span>
        <h3>Tugas tidak ditemukan</h3>
        <p>Tidak ada tugas yang sesuai dengan filter ini.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;