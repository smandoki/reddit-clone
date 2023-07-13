import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>hello world</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
