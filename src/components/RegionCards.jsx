import { useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/helpers";

export default function RegionCards({ regions }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 mt-6">
      {Object.entries(regions).map(([region, data]) => (
        <div
          key={region}
          onClick={() => navigate(`/loyihalar/${region}`)}
          className="cursor-pointer bg-white rounded-xl shadow-sm border
                     hover:shadow-md hover:border-indigo-400
                     transition p-5 flex items-center justify-between"
        >
          {/* LEFT */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {region}
            </h3>
            <p className="text-sm text-gray-500">
              {data.count} ta loyiha
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              {data.count} loyiha
            </span>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {formatMoney(data.totalContract)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
