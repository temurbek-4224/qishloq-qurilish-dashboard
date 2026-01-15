import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getProjects } from "../services/api";
import { calculateProjectsStats } from "../utils/projectsStats";
import SummaryCards from "../components/SummaryCards";
import ProjectsTable from "../components/ProjectsTable";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function RegionProjects() {
    const { region } = useParams();

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);


    // ✅ DATE RANGE STATE — TO‘G‘RI JOYDA
    const [dateRange, setDateRange] = useState([
        {
            startDate: null,
            endDate: null,
            key: "selection",
        },
    ]);

    useEffect(() => {
        getProjects().then(setProjects);
    }, []);

    // ✅ FILTER + SEARCH + STATUS + DATE
    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            // region
            if (p.viloyat !== region) return false;

            // search
            const matchesSearch = p.loyiha_nomi
                .toLowerCase()
                .includes(search.toLowerCase());

            // status
            const matchesStatus = !status || p.object_holati === status;

            // date range
            const projectDate = new Date(p.boshlanish_sana);
            const { startDate, endDate } = dateRange[0];

            const matchesDate =
                (!startDate || projectDate >= startDate) &&
                (!endDate || projectDate <= endDate);

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [projects, region, search, status, dateRange]);

    // ✅ STATISTICS FAQAT FILTERED DATA BO‘YICHA
    const stats = calculateProjectsStats(filteredProjects);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {region} viloyati loyihalari
            </h1>

            {/* SUMMARY */}
            <SummaryCards stats={stats.summary} />

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border p-4 my-6">
                <div className="flex items-center gap-3 mb-4">

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Loyiha nomi bo‘yicha qidirish"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300
             focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />


                    {/* STATUS */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-44 px-3 py-2 rounded-lg border border-gray-300
             bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Barcha holatlar</option>
                        <option value="Loyihalash">Loyihalash</option>
                        <option value="Shartnoma">Shartnoma</option>
                        <option value="Expertiza">Expertiza</option>
                        <option value="Topshirildi">Topshirildi</option>
                    </select>


                    {/* CALENDAR */}


                    <div className="relative ml-auto">
                        <button
                            onClick={() => setShowCalendar((v) => !v)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg
               border border-gray-300 bg-white text-sm
               hover:bg-gray-50"
                        >
                            📅 Sana bo‘yicha
                        </button>
                        {showCalendar && (
                            <div className="absolute right-0 top-full mt-2 z-50
                    bg-white rounded-xl shadow-2xl border">
                                <DateRange
                                    ranges={dateRange}
                                    onChange={(item) => setDateRange([item.selection])}
                                    editableDateInputs
                                    moveRangeOnFirstSelection={false}
                                />

                                <div className="flex justify-end gap-2 p-3 border-t">
                                    <button
                                        onClick={() => {
                                            setDateRange([
                                                {
                                                    startDate: null,
                                                    endDate: null,
                                                    key: "selection",
                                                },
                                            ]);
                                            setShowCalendar(false);
                                        }}
                                        className="text-sm px-3 py-1 rounded-md border"
                                    >
                                        Tozalash
                                    </button>

                                    <button
                                        onClick={() => setShowCalendar(false)}
                                        className="text-sm px-3 py-1 rounded-md bg-indigo-600 text-white"
                                    >
                                        Yopish
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* TABLE */}
            <ProjectsTable projects={filteredProjects} />
        </div>
    );
}
