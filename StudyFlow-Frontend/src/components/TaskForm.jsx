
import { useState } from "react";

const initialForm = {
  title: "",
  course: "",
  deadline: "",
  priority: "Sedang",
};

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState(initialForm);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await onAddTask({
        title: formData.title.trim(),
        course: formData.course.trim(),
        deadline: formData.deadline,
        priority: formData.priority,
      });

      setFormData(initialForm);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-card">
      <div className="section-heading form-heading">
        <div>
          <h2>Tambah Tugas</h2>
          <p>Catat tugas kuliah yang baru.</p>
        </div>

        <span className="form-heading-icon">＋</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Nama Tugas</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Contoh: Laporan praktikum"
            value={formData.title}
            onChange={handleChange}
            minLength={3}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Mata Kuliah</label>
          <input
            id="course"
            name="course"
            type="text"
            placeholder="Contoh: Pemrograman Web"
            value={formData.course}
            onChange={handleChange}
            minLength={2}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Prioritas</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Tinggi">Tinggi</option>
          </select>
        </div>

        {submitError && (
          <p className="form-error" role="alert">
            {submitError}
          </p>
        )}

        <button
          className="primary-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Menyimpan..." : "＋ Tambah Tugas"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
