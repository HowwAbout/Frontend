import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./EditPlanPage.css";
import axios from "axios";
import DatePlanTitle from "../EditPlanPage/DatePlanTitle";
import AIRecommendation from "../EditPlanPage/AIRecommendation";
import AIRecommendationList from "./AIRecommendationList";
import EditPlanScheduleList from "./EditPlanScheduleList";

interface AIRecommendationForm {
  activityDescription: string;
  activityImage: string;
  activityLocation: string;
  activityTitle: string;
  timeTotal: string;
}

interface PlanActivityResponse {
  planActivityId: number;
  datePlanId: number;
  dateActivityResponse: {
    dateActivityId: number;
    title: string;
    location: string;
    durationTime: string;
    description: string;
  };
  order: number;
}

interface DatePlan {
  id: number;
  title: string;
  date: string;
  description: string;
  planActivityResponseList: {
    planActivities: PlanActivityResponse[];
  };
}

const EditPlanPage: React.FC = () => {
  const location = useLocation();
  const datePlan = location.state?.datePlan as DatePlan | undefined;

  const [recommendations, setRecommendations] = useState<
    AIRecommendationForm[]
  >([]);

  const [schedules, setSchedules] = useState<
    { id: string; title: string; durationTime: string; description: string }[]
  >([]);

  const [searchText, setSearchText] = useState("");

  const sendPostRequest = async () => {
    try {
      const url = "http://3.35.149.55/ai/dating/generate"; // 실제 API URL로 변경하세요
      const data = {
        title: datePlan?.title,
        description: datePlan?.description,
        dateTime: datePlan?.date,
        activityDescription: "맛있는 식당",
      };

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Assume response.data is an array of AIRecommendationForm items
      setRecommendations(response.data);

      console.log("Response data:", response.data);
    } catch (error: any) {
      console.error(
        "Error occurred:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (datePlan) {
      const formattedSchedules =
        datePlan.planActivityResponseList.planActivities.map((activity) => ({
          id: activity.dateActivityResponse.dateActivityId.toString(),
          title: activity.dateActivityResponse.title,
          durationTime: activity.dateActivityResponse.durationTime,
          description: activity.dateActivityResponse.description,
        }));
      setSchedules(formattedSchedules);
    }
  }, [datePlan]);

  useEffect(() => {
    sendPostRequest();
  }, []);

  useEffect(() => {
    sendPostRequest();
  }, [searchText]); // Trigger request when searchText changes

  return (
    <div className="editplanpage_contents">
      <div className="dateplantitle_container">
        <DatePlanTitle
          title={datePlan?.title ?? "Undefined"}
          date={datePlan?.date ?? "Undefined"}
          description={datePlan?.description ?? "Undefined"}
        />
      </div>
      <div className="editplanschedulelist_container">
        <EditPlanScheduleList items={schedules} />
      </div>
      <div className="editplanpage_airecommendations">
        <AIRecommendation onSearchTextChange={setSearchText} />
        <AIRecommendationList items={recommendations} />
      </div>
    </div>
  );
};

export default EditPlanPage;
