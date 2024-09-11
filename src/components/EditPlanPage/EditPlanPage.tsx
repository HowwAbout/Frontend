import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const API_BASE_URL = "https://assemblytown.com";
const AI_BASE_URL = "http://43.203.252.59:8000";

const EditPlanPage: React.FC = () => {
  const location = useLocation();
  const datePlan = location.state?.datePlan as DatePlan | undefined;

  const [updatedDatePlan, setUpdatedDatePlan] = useState<DatePlan | null>();
  const [recommendations, setRecommendations] = useState<
    AIRecommendationForm[]
  >([]);

  const [schedules, setSchedules] = useState<
    {
      id: number;
      title: string;
      durationTime: string;
      description: string;
      location: string;
    }[]
  >([]);

  const navigate = useNavigate(); // Initialize useNavigate

  const [searchText, setSearchText] = useState("");

  const [activities, setActivities] = useState([]);

  const sendPostRequest = async (activityDescription: string) => {
    try {
      const url = `${AI_BASE_URL}/ai/dating/generate`; // 실제 API URL로 변경하세요
      const data = {
        title: datePlan?.title,
        description: datePlan?.description,
        dateTime: datePlan?.date,
        activityDescription,
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
    const fetchActivities = async () => {
      if (!datePlan?.id) {
        console.error("datePlan is undefined or has no ID");
        return;
      }

      try {
        const response = await axios.get(
          `https://assemblytown.com/api/date-plans/${datePlan.id}/activities`
        );
        setActivities(response.data);
        console.log("Fetched activities:", response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    if (datePlan?.id) {
      fetchActivities();
    }
  }, [datePlan?.id]);

  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
    sendPostRequest(searchText); // Send the request when Enter key is pressed
    console.log(
      `Request Sended. Title : ${datePlan?.title}, Description : ${datePlan?.description}, Date : ${datePlan?.date}, ActivityDescription : ${searchText}`
    );
  };

  useEffect(() => {
    if (datePlan) {
      const formattedSchedules =
        datePlan.planActivityResponseList.planActivities.map((activity) => ({
          id: activity.dateActivityResponse.dateActivityId,
          title: activity.dateActivityResponse.title,
          durationTime: activity.dateActivityResponse.durationTime,
          description: activity.dateActivityResponse.description,
          location: activity.dateActivityResponse.location,
        }));
      setSchedules(formattedSchedules);
    }
  }, [datePlan]);

  const fetchData = async (): Promise<DatePlan | null> => {
    if (!datePlan?.id) {
      console.error("datePlan is undefined or has no ID");
      return null; // 또는 적절한 예외 처리
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/date-plans/${datePlan.id}`
      );
      setUpdatedDatePlan(response.data); // Update state with fetched datePlan data
      return response.data;
    } catch (error) {
      console.error("Error fetching the updated date plan:", error);
      return null;
    }
  };

  const AddActivity = async () => {
    try {
      const activityData = {
        title: "New Activity",
        location: "Location",
        durationTime: "durationTime",
        description: "description",
        image: "image",
      };

      // POST request
      const response = await axios.post(
        `${API_BASE_URL}/api/dateActivities`,
        activityData
      );

      console.log("Activity added successfully:", response.data);

      if (datePlan?.id) {
        const response_post = await axios.post(
          `${API_BASE_URL}/api/plan-activities/${datePlan.id}`,
          {
            dateActivityId: response.data.dateActivityId,
            order: datePlan?.planActivityResponseList.planActivities.length + 1,
          }
        );
        console.log(
          "Activity linked to the plan successfully:",
          response_post.data
        );
      }
      // Fetch updated data and update items
      const updatedPlan = await fetchData();
      if (updatedPlan) {
        const updatedItems =
          updatedPlan.planActivityResponseList.planActivities.map(
            (activity: PlanActivityResponse) => ({
              id: activity.dateActivityResponse.dateActivityId,
              title: activity.dateActivityResponse.title,
              durationTime: activity.dateActivityResponse.durationTime,
              description: activity.dateActivityResponse.description,
              location: activity.dateActivityResponse.location,
            })
          );

        setSchedules(updatedItems);
        setUpdatedDatePlan(updatedPlan);
        console.log("Items and datePlan updated:", updatedItems);

        navigate("/editplan_page", { state: { datePlan: updatedPlan } });
      }
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <div className="editplanpage_contents">
      <div className="dateplantitle_container">
        {datePlan && datePlan.id && (
          <DatePlanTitle
            id={datePlan.id}
            title={datePlan?.title ?? "Undefined"}
            date={datePlan?.date ?? "Undefined"}
            description={datePlan?.description ?? "Undefined"}
          />
        )}
      </div>
      <div className="editplanschedulelist_container">
        {datePlan?.id && (
          <EditPlanScheduleList
            datePlan={datePlan}
            items={schedules}
            addActivity={AddActivity}
          />
        )}
      </div>
      <div className="editplanpage_airecommendations">
        <AIRecommendation onSearchTextChange={handleSearchTextChange} />
        {datePlan && (
          <AIRecommendationList
            items={recommendations}
            id={datePlan.id}
            addActivity={AddActivity}
          />
        )}
      </div>
    </div>
  );
};

export default EditPlanPage;
