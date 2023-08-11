import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CommunityPage from "./pages/CommunityPage";
import Submit from "./components/Community/Submit";
import CommentsPage from "./pages/CommentsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/r/:communityId" element={<CommunityPage />} />
          <Route path="/r/:communityId/submit" element={<Submit />} />
          <Route
            path="/r/:communityId/comments/:postId"
            element={<CommentsPage />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
