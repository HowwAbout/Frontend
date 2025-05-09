import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditPlanPage from "./components/EditPlanPage/EditPlanPage";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editplan_page" element={<EditPlanPage />} />
      </Routes>
    </Router>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
