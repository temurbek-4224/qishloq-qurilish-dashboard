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
    const [loading, setLoading] = useState(true);



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

    useEffect(() => {
        getProjects().then((data) => {
            setProjects(data);
            setLoading(false);
        });
    }, []);


    // const regionProjects = useMemo(() => {
    //     return projects.filter(p => p.viloyat === region);
    // }, [projects, region]);


    // ✅ FILTER + SEARCH + STATUS + DATE
    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            // region
            if (p.viloyat !== region) return false;

            // search (SAFE)
            const name = p.loyiha_nomi || "";
            const matchesSearch = name
                .toLowerCase()
                .includes(search.toLowerCase());

            // status
            const matchesStatus = status
                ? p.object_holati === status
                : true;

            // date range (SAFE)
            let matchesDate = true;
            if (dateRange?.[0]?.startDate && dateRange?.[0]?.endDate) {
                const projectDate = new Date(p.boshlanish_sana);
                matchesDate =
                    projectDate >= dateRange[0].startDate &&
                    projectDate <= dateRange[0].endDate;
            }

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [projects, region, search, status, dateRange]);

    // console.log("region:", region);
    // console.log("projects:", projects.length);
    // console.log("filtered:", filteredProjects.length);





    // ✅ STATISTICS FAQAT FILTERED DATA BO‘YICHA
    // const stats = calculateProjectsStats(filteredProjects);

    const stats = useMemo(() => {
        return calculateProjectsStats(filteredProjects);
    }, [filteredProjects]);

    // console.log("STATS:", stats);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {region} viloyati loyihalari
            </h1>

            {/* SUMMARY */}


            {/* {!loading && filteredProjects.length > 0 && (
                <SummaryCards summary={stats.summary} />
            )} */}
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
