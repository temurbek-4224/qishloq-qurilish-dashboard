import { useEffect, useState, useMemo } from "react";
import { getProjects } from "../services/api";
import SummaryCards from "../components/SummaryCards";
import RegionCards from "../components/RegionCards";
import ProjectsTable from "../components/ProjectsTable";
import { calculateProjectsStats } from "../utils/projectsStats";
import { isDelayedProject } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";

export default function Projects() {
  // DATA
  const [projects, setProjects] = useState([]);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [searchParams] = useSearchParams();
  const delayedOnly = searchParams.get("filter") === "delayed";


  // API
  useEffect(() => {
    getProjects().then((res) => {
      setProjects(res || []);
    });
  }, []);

  // 1️⃣ SEARCH + STATUS FILTER
  const filteredBySearchAndStatus = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.loyiha_nomi?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status
        ? p.object_holati === status
        : true;

      const matchesDelayed = delayedOnly
        ? isDelayedProject(p)
        : true;

      return matchesSearch && matchesStatus && matchesDelayed;
    });
  }, [projects, search, status, delayedOnly]);



  // 2️⃣ REGION FILTER
  const filteredProjects = useMemo(() => {
    if (selectedRegion === "ALL") return filteredBySearchAndStatus;

    return filteredBySearchAndStatus.filter(
      (p) => p.viloyat === selectedRegion
    );
  }, [filteredBySearchAndStatus, selectedRegion]);

  // 3️⃣ STATS
  const statsAll = useMemo(
    () => calculateProjectsStats(projects),
    [projects]
  );

  const statsFiltered = useMemo(
    () => calculateProjectsStats(filteredProjects),
    [filteredProjects]
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">Loyihalar</h1>

      {/* SUMMARY */}
      <SummaryCards summary={statsFiltered.summary} />

      {/* REGIONS */}
      <RegionCards
        regions={delayedOnly ? statsFiltered.regions : statsAll.regions}
        selected={selectedRegion}
        onSelect={setSelectedRegion}
        delayedOnly={delayedOnly}
      />

      {/* FILTER BAR 
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          <input
            type="text"
            placeholder="Loyiha nomi bo‘yicha qidirish"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="md:w-56 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Barcha holatlar</option>
            <option value="Shartnoma">Shartnoma</option>
            <option value="Loyihalash">Loyihalash</option>
            <option value="Expertiza">Expertiza</option>
            <option value="Topshirildi">Topshirildi</option>
          </select>
        </div>
      </div>

      */}

      {/* TABLE */}
      {/* <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <ProjectsTable projects={filteredProjects} />
      </div> */}
    </div>
  );
}
