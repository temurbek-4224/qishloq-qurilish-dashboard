import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import { calculateProjectsStats } from "../utils/projectsStats";
import SummaryCards from "../components/SummaryCards";
import ProjectsTable from "../components/ProjectsTable";

export default function RegionProjects() {
    const { region } = useParams();
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        getProjects().then(setProjects);
    }, []);

    const regionProjects = projects.filter((p) => {
        const byRegion = p.viloyat === region;

        const byName = search
            ? p.loyiha_nomi?.toLowerCase().includes(search.toLowerCase())
            : true;

        const byStatus = status
            ? p.object_holati === status
            : true;

        return byRegion && byName && byStatus;
    });

    const stats = calculateProjectsStats(regionProjects);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {region} viloyati loyihalari
            </h1>

            {/* SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Umumiy shartnoma</p>
                    <p className="text-blue-600 font-bold">
                        {stats.summary.totalContract.toLocaleString()} so'm
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">To‘langan</p>
                    <p className="text-green-600 font-bold">
                        {stats.summary.totalPaid.toLocaleString()} so'm
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Qolgan</p>
                    <p className="text-red-600 font-bold">
                        {stats.summary.totalRemaining.toLocaleString()} so'm
                    </p>
                </div>
            </div>

            {/* SEARCH & FILTER TOOLBAR */}
            <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-3">

                    {/* SEARCH */}
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                        <input
                            type="text"
                            placeholder="Loyiha nomi bo‘yicha qidirish"
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300
                   text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* STATUS FILTER */}
                    <select
                        className="w-full md:w-56 px-3 py-2 rounded-lg border border-gray-300
                 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

            {/* KEYIN TABLE QO‘SHAMIZ */}

            <ProjectsTable projects={regionProjects} />


        </div>
    );
}
