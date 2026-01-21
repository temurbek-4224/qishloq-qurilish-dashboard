import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import StatusPie from "../components/charts/StatusPie";
import { getProjects } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  calculateTotalSum,
  countProjects,
  countByStatus,
  countDelayedProjects,
} from "../utils/helpers";


function Dashboard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const totalSum = calculateTotalSum(projects);
  const totalCount = countProjects(projects);
  const delayedCount = countDelayedProjects(projects);
  const statusStats = countByStatus(projects);



  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <DashboardCard
          title="Umumiy tushum"
          value={`${totalSum.toLocaleString()} so'm`}
          color="green"
        />
        <DashboardCard
          title="Loyihalar soni"
          value={`${totalCount} ta`}
          color="blue"
        />
        <DashboardCard
          title="Kechikayotgan loyihalar"
          value={`${delayedCount} ta`}
          color="red"
          onClick={() => navigate("/loyihalar?filter=delayed")}
        />
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusPie data={statusStats} />
      </div>
    </div>
  );
}

export default Dashboard;
