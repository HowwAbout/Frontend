import React, { useState, useEffect } from "react";
import { Axios } from "axios";
import MenuBar from "./components/Menubar";
import Header from "./components/Header";
import PlanList from "./components/PlanList";
import Sidebar from "./components/Sidebar";
import { Schedule } from "./types/Schedule";
import "./styles/App.css";
import API from "./components/API";

const initialSchedules: Schedule[] = [
  {
    id: "1",
    title: "Dating Schedule Title 1",
    date: "2000.01.01",
    category: "Category",
    location: "Location",
  },
  {
    id: "2",
    title: "Dating Schedule Title 2",
    date: "2000.01.01",
    category: "Category",
    location: "Location",
  },
  {
    id: "3",
    title: "Dating Schedule Title 3",
    date: "2000.01.01",
    category: "Category",
    location: "Location",
  },
  {
    id: "4",
    title: "Dating Schedule Title 4",
    date: "2000.01.01",
    category: "Category",
    location: "Location",
  },
];

const App: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
    const savedSchedules = localStorage.getItem("schedules");
    return savedSchedules ? JSON.parse(savedSchedules) : initialSchedules;
  });

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <MenuBar />
        <Header />
        <PlanList />
      </div>
    </div>
  );
};

export default App;
