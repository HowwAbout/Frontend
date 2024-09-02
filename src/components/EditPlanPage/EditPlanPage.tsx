import React from "react";
import "./EditPlanPage.css";
import DatePlanTitle from "../EditPlanPage/DatePlanTitle";
import AIRecommendation from "../EditPlanPage/AIRecommendation";
import AIRecommendationList from "./AIRecommendationList";
import EditPlanScheduleList from "./EditPlanScheduleList";

const recommendations = [
  { id: "1", content: "Recommendation 1" },
  { id: "2", content: "Recommendation 2" },
  { id: "3", content: "Recommendation 3" },
  { id: "4", content: "Recommendation 4" },
  { id: "5", content: "Recommendation 5" },
  { id: "6", content: "Recommendation 6" },
  { id: "7", content: "Recommendation 7" },
  { id: "8", content: "Recommendation 8" },
  { id: "9", content: "Recommendation 9" },
  { id: "10", content: "Recommendation 10" },
];

const schedules = [
  { id: "1", content: "Schedule 1" },
  { id: "2", content: "Schedule 2" },
  { id: "3", content: "Schedule 3" },
  { id: "4", content: "Schedule 4" },
  { id: "5", content: "Schedule 5" },
  { id: "6", content: "Schedule 6" },
  { id: "7", content: "Schedule 7" },
  { id: "8", content: "Schedule 8" },
  { id: "9", content: "Schedule 9" },
  { id: "10", content: "Schedule 10" },
];

const EditPlanPage: React.FC = () => {
  return (
    <div className="editplanpage_contents">
      <div className="dateplantitle_container">
        <DatePlanTitle />
      </div>
      <div className="editplanschedulelist_container">
        <EditPlanScheduleList items={schedules} />
      </div>
      <div className="editplanpage_airecommendations">
        <AIRecommendation />
        <AIRecommendationList items={recommendations} />
      </div>
    </div>
  );
};

export default EditPlanPage;
