function TaskCard({ task, onUpdateStatus, onDeleteTask }) {
  const statusClasses = {
    "Belum dikerjakan": "status-pending",
    "Sedang dikerjakan": "status-progress",
    Selesai: "status-completed",
  };

  const priorityClasses = {
    Rendah: "priority-low",
    Sedang: "priority-medium",
    Tinggi: "priority-high",
  };

  const nextStatus = {
    "Belum dikerjakan": "Sedang dikerjakan",
    "Sedang dikerjakan": "Selesai",
    Selesai: "Belum dikerjakan",
  };

  const actionLabels = {
    "Belum dikerjakan": "Mulai kerjakan",
    "Sedang dikerjakan": "Tandai selesai",
    Selesai: "Aktifkan kembali",
  };

  const formattedDeadline = new Date(
    `${task.deadline}T00:00:00`
  ).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="task-card">
      <div className="task-card-top">
        <span
          className={`status-badge ${statusClasses[task.status]}`}
        >
          {task.status}
        </span>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDeleteTask(task.id)}
          aria-label={`Hapus tugas ${task.title}`}
          title="Hapus tugas"
        >
          ×
        </button>
      </div>

      <h3>{task.title}</h3>
      <p className="task-course">{task.course}</p>

      <div className="task-meta">
        <span className="deadline">
          <span>▦</span>
          {formattedDeadline}
        </span>

        <span
          className={`priority-badge ${priorityClasses[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="task-card-bottom">
        <span className="task-priority-label">
          Prioritas {task.priority.toLowerCase()}
        </span>

        <button
          className="text-button"
          type="button"
          onClick={() =>
            onUpdateStatus(task.id, nextStatus[task.status])
          }
        >
          {actionLabels[task.status]} →
        </button>
      </div>
    </article>
  );
}

export default TaskCard;