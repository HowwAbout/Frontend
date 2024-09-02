import React from "react";
import "./EditPlanPage.css";
import DatePlanTitle from "../EditPlanPage/DatePlanTitle";
import AIRecommendation from "../EditPlanPage/AIRecommendation";
import AIRecommendationList from "./AIRecommendationList";

const recommendations = [
  { id: "1", content: "Recommendation 1" },
  { id: "2", content: "Recommendation 2" },
  { id: "3", content: "Recommendation 3" },
];

const EditPlanPage: React.FC = () => {
  return (
    <div className="editplanpage_contents">
      <DatePlanTitle />
      <div className="editplanpage_airecommendations">
        <AIRecommendation />
        <AIRecommendationList items={recommendations} />
      </div>
    </div>
  );
};

export default EditPlanPage;
