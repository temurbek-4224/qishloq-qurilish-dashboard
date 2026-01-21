function DashboardCard({ title, value, subtitle, color = "blue", icon , onClick}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow p-5 flex items-start gap-4
        ${onClick ? "cursor-pointer hover:shadow-md transition" : ""}`}
    >
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default DashboardCard;
