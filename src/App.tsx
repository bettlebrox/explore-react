import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeDetail } from "./components/ThemeDetail";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/theme/:themeTitle" element={<ThemeDetail />} />
      </Routes>
    </>
  );
}

export default App;
