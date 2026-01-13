import { formatMoney } from "../utils/helpers";

export default function SummaryCards({ summary }) {
  const { totalContract, totalPaid, totalRemaining } = summary;

  const cards = [
    {
      title: "Umumiy shartnoma",
      value: totalContract,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "To‘langan",
      value: totalPaid,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Qolgan",
      value: totalRemaining,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((c) => (
        <div
          key={c.title}
          className="bg-white rounded-xl shadow p-5"
        >
          <p className="text-sm text-gray-500 mb-1">{c.title}</p>
          <p className={`text-2xl font-bold ${c.color}`}>
            {formatMoney(c.value)} so‘m
          </p>
        </div>
      ))}
    </div>
  );
}
