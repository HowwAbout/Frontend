import React, { useState } from "react";
import axios from "axios";

const PostRequestComponent: React.FC = () => {
  const [responseData, setResponseData] = useState<string | null>(null);

  // POST 요청을 보내는 함수
  const sendPostRequest = async () => {
    try {
      const url = "http://43.201.61.229/api/dateActivities"; // 실제 API URL로 변경하세요
      const data = {
        title: "성수동 분위기 좋은 와인바 가기",
        location: "서울 성동구 연무장17길 5 4층",
        durationTime: "1시간 30분",
        description:
          "분위기 좋은 성수동에 위치한 엔티크 와인 바의 야외 루프탑에서 “옥상 수비드 부채살 스테이크”와 레드와인을 곁들여 즐기기",
        image: "미정",
      };
      // Axios로 POST 요청
      const response = await axios.post(url, data);

      // 성공적으로 응답받은 데이터를 상태에 저장
      setResponseData(JSON.stringify(response.data, null, 2));

      // 콘솔에 응답 데이터를 출력
      console.log("Response data:", response.data);
    } catch (error: any) {
      // 에러 발생 시 콘솔에 출력
      console.error(
        "Error occurred:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h1>POST Request Example</h1>
      <button onClick={sendPostRequest}>Send POST Request</button>
      {responseData && (
        <div>
          <h3>Response Data:</h3>
          <pre>{responseData}</pre>
        </div>
      )}
    </div>
  );
};

export default PostRequestComponent;
