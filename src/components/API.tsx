import React, { useState } from "react";
import axios from "axios";

const PostRequestComponent: React.FC = () => {
  const [responseData, setResponseData] = useState<string | null>(null);

  // POST 요청을 보내는 함수
  const sendPostRequest = async () => {
    try {
      const url = "http://3.36.227.72:8080/dateActivities"; // 실제 API URL로 변경하세요
      const data = {
        key1: "value1",
        key2: "value2",
      };

      // Axios로 POST 요청
      const response = await axios.post(url);

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
