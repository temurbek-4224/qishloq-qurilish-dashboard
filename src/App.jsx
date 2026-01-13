import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import RegionProjects from "./pages/RegionProjects";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/loyihalar/:region"
            element={<RegionProjects />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
