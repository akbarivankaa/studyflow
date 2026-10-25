function SummaryCards({ tasks }) {
  const summaries = [
    {
      label: "Total Tugas",
      value: tasks.length,
      icon: "📚",
      color: "blue",
    },
    {
      label: "Sedang Dikerjakan",
      value: tasks.filter(
        (task) => task.status === "Sedang dikerjakan"
      ).length,
      icon: "⏳",
      color: "orange",
    },
    {
      label: "Belum Dikerjakan",
      value: tasks.filter(
        (task) => task.status === "Belum dikerjakan"
      ).length,
      icon: "📝",
      color: "purple",
    },
    {
      label: "Tugas Selesai",
      value: tasks.filter(
        (task) => task.status === "Selesai"
      ).length,
      icon: "✓",
      color: "green",
    },
  ];

  return (
    <section className="summary-grid">
      {summaries.map((item) => (
        <article
          className="summary-card"
          key={item.label}
        >
          <div className={`summary-icon ${item.color}`}>
            {item.icon}
          </div>

          <div>
            <p>{item.label}</p>
            <h2>{item.value}</h2>
          </div>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;