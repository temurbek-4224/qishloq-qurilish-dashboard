import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import { formatMoney } from "../utils/helpers";

const statusStyles = {
  Shartnoma: "bg-blue-100 text-blue-700",
  Loyihalash: "bg-indigo-100 text-indigo-700",
  Expertiza: "bg-orange-100 text-orange-700",
  Topshirildi: "bg-green-100 text-green-700",
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const filtered = projects.filter((p) => {
    const byName = p.loyiha_nomi
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const byStatus = status ? p.object_holati === status : true;

    return byName && byStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Loyihalar
        </h1>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="🔍 Loyiha nomi bo‘yicha qidirish..."
            className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="w-full md:w-56 px-4 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Barcha holatlar</option>
            <option value="Shartnoma">Shartnoma</option>
            <option value="Loyihalash">Loyihalash</option>
            <option value="Expertiza">Expertiza</option>
            <option value="Topshirildi">Topshirildi</option>
          </select>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 sticky top-0">
              <tr className="text-xs uppercase">
                <th className="px-4 py-3 text-left">№</th>
                <th className="px-4 py-3 text-left">Loyiha nomi</th>
                <th className="px-4 py-3">Viloyat</th>
                <th className="px-4 py-3">Buyurtmachi</th>
                <th className="px-4 py-3 text-right">Shartnoma</th>
                <th className="px-4 py-3 text-right">To‘langan</th>
                <th className="px-4 py-3 text-right">Qolgan</th>
                <th className="px-4 py-3 text-center">Holati</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => {
                const qolgan =
                  (p.shartnoma_summa || 0) -
                  (p.tolangan_summa || 0);

                return (
                  <tr
                    key={p.id}
                    className="border-t even:bg-gray-50 hover:bg-indigo-50 transition"
                  >
                    <td className="px-4 py-3">{i + 1}</td>

                    <td className="px-4 py-3 max-w-[360px]">
                      <span
                        className="block truncate"
                        title={p.loyiha_nomi}
                      >
                        {p.loyiha_nomi}
                      </span>
                    </td>

                    <td className="px-4 py-3">{p.viloyat}</td>

                    <td className="px-4 py-3 max-w-[240px] truncate">
                      {p.buyurtmachi}
                    </td>

                    <td className="px-4 py-3 text-right font-medium">
                      {formatMoney(p.shartnoma_summa)}
                    </td>

                    <td className="px-4 py-3 text-right text-green-600 font-medium">
                      {formatMoney(p.tolangan_summa)}
                    </td>

                    <td
                      className={`px-4 py-3 text-right font-semibold ${
                        qolgan > 0
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      {formatMoney(qolgan)}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[p.object_holati]
                        }`}
                      >
                        {p.object_holati}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}