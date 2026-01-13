import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import { formatMoney, calcQolganSumma } from "../utils/helpers";
import { statusStyles } from "../utils/statusStyles";


export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        getProjects().then((data) => {
            const found = data.find((p) => String(p.id) === id);
            setProject(found);
        });
    }, [id]);

    if (!project) {
        return <div className="text-gray-500">Yuklanmoqda...</div>;
    }

    const qolgan = calcQolganSumma(project.shartnoma_summa, project.tolangan_summa);

    return (
        <div className="space-y-6">
            {/* TITLE */}

            <div className="mb-6">
                <h1 className="text-2xl font-bold leading-snug">
                    {project.loyiha_nomi}
                </h1>

                <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-gray-500">
                        {project.viloyat}
                    </span>

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
      ${statusStyles[project.object_holati]}`}
                    >
                        {project.object_holati}
                    </span>
                </div>
            </div>


            {/* SUMMARY */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-sm text-gray-600">Shartnoma</p>
                    <p className="text-xl font-bold text-blue-700">
                        {formatMoney(project.shartnoma_summa)}
                    </p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <p className="text-sm text-gray-600">To‘langan</p>
                    <p className="text-xl font-bold text-green-700">
                        {formatMoney(project.tolangan_summa)}
                    </p>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p className="text-sm text-gray-600">Qolgan</p>
                    <p className="text-xl font-bold text-red-700">
                        {formatMoney(qolgan)}
                    </p>
                </div>
            </div>


            {/* DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* LEFT */}
                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-sm text-gray-500 mb-1">Buyurtmachi</p>
                    <p className="font-medium mb-4">{project.buyurtmachi}</p>

                    <p className="text-sm text-gray-500 mb-1">Viloyat</p>
                    <p className="font-medium">{project.viloyat}</p>
                </div>

                {/* RIGHT */}
                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-lg font-semibold mb-2">Izoh</h3>

                    {project.izox ? (
                        <p className="text-gray-700 leading-relaxed">
                            {project.izox}
                        </p>
                    ) : (
                        <p className="text-gray-400 italic">
                            Izoh mavjud emas
                        </p>
                    )}
                </div>
            </div>


            {/* <div className="bg-white rounded-xl shadow p-5 mt-6">
                <h3 className="text-lg font-semibold mb-3">Hujjatlar</h3>

                <button
                    onClick={() => alert("Keyin backend ulanadi")}
                    className="inline-flex items-center gap-2 px-4 py-2
               bg-blue-600 text-white rounded-lg
               hover:bg-blue-700 transition"
                >
                    📄 Shartnoma faylini yuklab olish
                </button>
            </div> */}

            <div className="bg-white rounded-xl shadow p-5">
                <h3 className="text-lg font-semibold mb-4">Hujjatlar</h3>

                <div className="space-y-3">
                    <div className="flex items-center justify-between
                    border rounded-lg p-4">
                        <div>
                            <p className="font-medium">Shartnoma.pdf</p>
                            <p className="text-sm text-gray-500">PDF hujjat</p>
                        </div>

                        <button
                            className="px-4 py-2 bg-green-600 text-white
                   rounded-lg hover:bg-green-700"
                        >
                            Yuklab olish
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );
}
