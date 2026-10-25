import { useState } from "react";
import AppHeader from "./components/AppHeader";
import SummaryCards from "./components/SummaryCards";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

const initialTasks = [
  {
    id: 1,
    title: "Menyusun laporan praktikum React",
    course: "Pemrograman Web",
    deadline: "2026-11-02",
    priority: "Tinggi",
    status: "Sedang dikerjakan",
  },
  {
    id: 2,
    title: "Mempelajari state dan props",
    course: "React Dasar",
    deadline: "2026-11-04",
    priority: "Sedang",
    status: "Belum dikerjakan",
  },
  {
    id: 3,
    title: "Menyelesaikan latihan komponen UI",
    course: "Pengembangan Web",
    deadline: "2026-11-06",
    priority: "Rendah",
    status: "Selesai",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState("Semua");

  function handleAddTask(newTask) {
    setTasks((currentTasks) => [
      {
        ...newTask,
        id: Date.now(),
        status: "Belum dikerjakan",
      },
      ...currentTasks,
    ]);

    setActiveFilter("Semua");
  }

  function handleUpdateStatus(id, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  const filteredTasks =
    activeFilter === "Semua"
      ? tasks
      : tasks.filter((task) => task.status === activeFilter);

  return (
    <div className="app-shell">
      <AppHeader />

      <main className="container" id="dashboard">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">STUDENT TASK MANAGEMENT</p>
            <h1>Kelola tugasmu, capai tujuanmu.</h1>
            <p className="welcome-description">
              Semua tugas kuliahmu dalam satu tempat.
              Tetap teratur dan selesaikan satu per satu.
            </p>
          </div>

          <div className="welcome-badge">
            <span className="welcome-badge-icon">✦</span>
            <span>
              <strong>Stay focused</strong>
              <small>One task at a time</small>
            </span>
          </div>
        </section>

        <SummaryCards tasks={tasks} />

        <section className="workspace">
          <aside className="form-panel">
            <TaskForm onAddTask={handleAddTask} />

            <div className="tip-card">
              <span>💡</span>
              <div>
                <strong>Tips produktivitas</strong>
                <p>
                  Kerjakan tugas dengan deadline terdekat
                  terlebih dahulu.
                </p>
              </div>
            </div>
          </aside>

          <section className="tasks-panel" id="daftar-tugas">
            <div className="section-heading">
              <div>
                <h2>Daftar Tugas</h2>
                <p>Pantau progres tugas kuliahmu.</p>
              </div>

              <span className="task-count">
                {tasks.length} tugas
              </span>
            </div>

            <TaskFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            <TaskList
              tasks={filteredTasks}
              totalTasks={tasks.length}
              onUpdateStatus={handleUpdateStatus}
              onDeleteTask={handleDeleteTask}
            />
          </section>
        </section>

        <footer className="app-footer">
          <p>
            StudyFlow · Dikembangkan oleh Muhammad Akbar Ivanka
            · 103122400069
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;