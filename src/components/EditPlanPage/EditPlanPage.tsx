import React, { useState, useEffect } from "react";
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
  const [recommendations, setRecommendations] = useState<
    AIRecommendationForm[]
  >([]);

  const sendPostRequest = async () => {
    try {
      const url = "http://3.34.200.137/ai/dating/generate"; // 실제 API URL로 변경하세요
      const data = {
        title: "성북구 분위기 좋은 와인바 가기",
        description:
          "엔티크 와인 바의 야외 루프탑에서 “옥상 수비드 부채살 스테이크”와 레드와인을 곁들여 즐기기",
        dateTime: "1시간 30분",
        activityDescription:
          "분위기 좋은 성북구에 위치한 엔티크 와인 바의 야외 루프탑에서 “옥상 수비드 부채살 스테이크”와 레드와인을 곁들여 즐기기",
      };

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json"
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
    sendPostRequest();
  }, []);

  useEffect(() => {
    sendPostRequest();
  }, []);

  useEffect(() => {
    sendPostRequest();
  }, []);

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
