export default function SummaryCards({ summary = {} }) {

  if (!summary) return null;
  
  const {
    totalContract = 0,
    totalPaid = 0,
    totalRemaining = 0,
  } = summary;

  // console.log(totalContract, totalContract, totalRemaining)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-500">Umumiy shartnoma</p>
        <p className="text-blue-600 font-bold">
          {totalContract.toLocaleString()} so'm
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-500">To‘langan</p>
        <p className="text-green-600 font-bold">
          {totalPaid.toLocaleString()} so'm
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-500">Qolgan</p>
        <p className="text-red-600 font-bold">
          {totalRemaining.toLocaleString()} so'm
        </p>
      </div>
    </div>
  );
}
