import React from "react";
import "./EditPlanPage.css";
import DatePlanTitle from "../EditPlanPage/DatePlanTitle";
import AIRecommendation from "../EditPlanPage/AIRecommendation";

const EditPlanPage: React.FC = () => {
  return (
    <div className="editplanpage_contents">
      <DatePlanTitle />
      <AIRecommendation />
    </div>
  );
};

export default EditPlanPage;
