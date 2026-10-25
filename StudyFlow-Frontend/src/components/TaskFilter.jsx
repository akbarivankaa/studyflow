const filters = [
  "Semua",
  "Belum dikerjakan",
  "Sedang dikerjakan",
  "Selesai",
];

function TaskFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-list">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filter-button ${
            activeFilter === filter ? "selected" : ""
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;