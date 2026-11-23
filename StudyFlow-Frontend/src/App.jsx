import { useEffect, useState } from "react";

import AppHeader from "./components/AppHeader";
import SummaryCards from "./components/SummaryCards";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

const API_URL = "http://localhost:3000/tasks";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
  });

  const responseText = await response.text();
  let data = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }
  }

  if (!response.ok) {
    const message = Array.isArray(data?.message)
      ? data.message.join(", ")
      : data?.message || "Terjadi kesalahan pada server.";

    throw new Error(message);
  }

  return data;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Semua");

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await apiRequest("");

        setTasks(data);
        setLoadError("");
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  async function handleAddTask(newTask) {
    setActionError("");

    try {
      const createdTask = await apiRequest("", {
        method: "POST",
        body: JSON.stringify(newTask),
      });

      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);

      setActiveFilter("Semua");
    } catch (error) {
      setActionError(error.message);
      throw error;
    }
  }

  async function handleUpdateStatus(id, newStatus) {
    setActionError("");

    try {
      const updatedTask = await apiRequest(`/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      setActionError(error.message);
    }
  }

  async function handleDeleteTask(id) {
    setActionError("");

    try {
      await apiRequest(`/${id}`, {
        method: "DELETE",
      });

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      setActionError(error.message);
    }
  }

  const filteredTasks =
    activeFilter === "Semua"
      ? tasks
      : tasks.filter(
          (task) => task.status === activeFilter
        );

  return (
    <div className="app-shell">
      <AppHeader />

      <main className="container" id="dashboard">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">
              STUDENT TASK MANAGEMENT
            </p>

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

          <section
            className="tasks-panel"
            id="daftar-tugas"
          >
            <div className="section-heading">
              <div>
                <h2>Daftar Tugas</h2>
                <p>Pantau progres tugas kuliahmu.</p>
              </div>

              <span className="task-count">
                {tasks.length} tugas
              </span>
            </div>

            {actionError && (
              <p className="api-error" role="alert">
                {actionError}
              </p>
            )}

            <TaskFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {isLoading ? (
              <p>Memuat data tugas dari server...</p>
            ) : loadError ? (
              <div className="empty-state">
                <h3>Gagal mengambil data tugas</h3>
                <p>{loadError}</p>
              </div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                totalTasks={tasks.length}
                onUpdateStatus={handleUpdateStatus}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </section>
        </section>

        <footer className="app-footer">
          <p>
            StudyFlow · Muhammad Akbar Ivanka
            · 103122400069
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;