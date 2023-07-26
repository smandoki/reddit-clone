import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CommunityPage from "./pages/CommunityPage";
import Submit from "./components/Community/submit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/r/:communityId" element={<CommunityPage />} />
          <Route path="/r/:communityId/submit" element={<Submit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
