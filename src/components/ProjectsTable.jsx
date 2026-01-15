import { formatMoney, calcQolganSumma } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";


const statusStyles = {
    Shartnoma: "bg-blue-100 text-blue-700",
    Loyihalash: "bg-indigo-100 text-indigo-700",
    Expertiza: "bg-orange-100 text-orange-700",
    Topshirildi: "bg-green-100 text-green-700",
};

export default function ProjectsTable({ projects }) {

    const navigate = useNavigate();

    if (!projects.length) {
        return (
            <div className="text-center text-gray-500 py-10">
                Bu viloyat bo‘yicha loyihalar topilmadi
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow border overflow-hidden mt-6">
            <div className="overflow-x-auto">
               <table className="min-w-full text-sm table-fixed">

                    <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left">№</th>
                            <th className="px-4 py-3 text-left">Loyiha nomi</th>
                            <th className="px-4 py-3 text-left">Buyurtmachi</th>
                            <th className="px-4 py-3 text-left">Shartnoma raqami</th>
                            <th className="px-4 py-3 text-left">Boshlangan sana</th>
                            {/* <th className="px-4 py-3 text-right">Objectlar soni</th> */}
                            <th className="px-4 py-3 text-center">Holati</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {projects.map((p, index) => (
                            <tr
                                key={p.id || index}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => navigate(`/projects/${p.id}`)}
                            >
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3 max-w-[420px]">
                                    <div
                                        className="truncate cursor-help"
                                        title={p.loyiha_nomi}
                                    >
                                        {p.loyiha_nomi}
                                    </div>
                                </td>
                                <td className="px-4 py-3 max-w-[260px]">
                                    <div
                                        className="truncate cursor-help"
                                        title={p.buyurtmachi}
                                    >
                                        {p.buyurtmachi}
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    {p.shartnoma_raqam || "-"}
                                </td>
                                <td className="px-4 py-3">
                                    {formatDate(p.boshlanish_sana)}
                                </td>
                                {/* <td className="px-4 py-3 text-center font-semibold">
                                    {p.object_soni ?? 0}
                                </td> */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyles[p.object_holati]}`}
                                    >
                                        {p.object_holati}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
