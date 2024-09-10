import React, { useState, useEffect } from "react";
import "./EditPlanPage.css";
import axios from "axios";
import DatePlanTitle from "../EditPlanPage/DatePlanTitle";
import AIRecommendation from "../EditPlanPage/AIRecommendation";
import AIRecommendationList from "./AIRecommendationList";
import EditPlanScheduleList from "./EditPlanScheduleList";

interface AIRecommendationForm {
  title: string;
  description: string;
  dateTime: string;
  activityDescription: string;
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
  const [responseData, setResponseData] = useState<AIRecommendationForm | null>(
    null
  );
  const [recommendations, setRecommendations] = useState<
    { id: string; content: string }[]
  >([]);

  const sendPostRequest = async () => {
    try {
      const url = "http://3.35.149.55/ai/dating/generate"; // 실제 API URL로 변경하세요
      const data = {
        title: "성북구 분위기 좋은 와인바 가기",
        description:
          "분위기 좋은 엔티크 와인 바의 야외 루프탑에서 “옥상 수비드 부채살 스테이크”와 레드와인을 곁들여 즐기기",
        dateTime: "1시간 30분",
        activityDescription: "성북구 스테이크 맛집이랑 와인바 추천",
      };

      // Axios로 POST 요청
      const recommendation_response = await axios.post(url, data);

      // 성공적으로 응답받은 데이터를 상태에 저장
      setResponseData(recommendation_response.data);

      // 응답 데이터를 recommendations 상태에 맞게 변환하여 저장
      const newRecommendations = recommendation_response.data.map(
        (item: any, index: number) => ({
          id: String(index + 1),
          content: item.content || item.title, // Assuming content/title is part of the response
        })
      );
      setRecommendations(newRecommendations);

      // 콘솔에 응답 데이터를 출력
      console.log("Response data:", recommendation_response.data);
    } catch (error: any) {
      // 에러 발생 시 콘솔에 출력
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
