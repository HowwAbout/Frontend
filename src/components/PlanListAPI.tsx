import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import "./PlanList.css";
import EditPlanModal from "./EditPlan/EditPlanModal"; // 모달 컴포넌트 가져오기
import PlanListItem from "./PlanListItem";
import AddPlan from "./AddPlan"; // 플랜 추가 버튼 컴포넌트
import Favorite_Gray from "../assets/icons/Favorite_Gray.svg";
import Favorite_Red from "../assets/icons/Favorite_Red.svg";

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
  liked?: boolean; // Adding liked property to DatePlan type
}

const API_BASE_URL = "https://assemblytown.com";

const PlanListAPI: React.FC = () => {
  const [plans, setPlans] = useState<DatePlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태
  const [modalData, setModalData] = useState<DatePlan | null>(null); // 모달에 넘길 데이터

  const [planData, setPlanData] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
  });

  // Fetching plans and making it reusable across the component
  const fetchDatePlans = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get<DatePlan[]>(
        `https://assemblytown.com/api/date-plans`
      );
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching date plans:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Call fetchDatePlans when the component mounts
  useEffect(() => {
    fetchDatePlans();
  }, []);

  const handleItemClick = (plan: DatePlan) => {
    setModalData(plan);
    setIsModalOpen(true);
  };

  const handleToggleLike = (id: number) => {
    const updatedPlans = plans.map((plan) =>
      plan.id === id ? { ...plan, liked: !plan.liked } : plan
    );
    setPlans(updatedPlans);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newPlans = Array.from(plans);
    const [movedPlan] = newPlans.splice(result.source.index, 1);
    newPlans.splice(result.destination.index, 0, movedPlan);

    setPlans(newPlans);
  };

  const openModal = (plan: DatePlan) => {
    setModalData(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleAddPlan = async () => {
    const payload = {
      title: "새 데이트 일정",
      date: "2024-09-11",
      description: "새 데이트 일정 설명",
      image: "image",
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/date-plans`,
        payload
      );
      if (response.status === 201) {
        console.log("Plan added successfully:", response.data);
        fetchDatePlans(); // Refresh the plans after adding a new one
      }
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="plan-list-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="planList">
          {(provided) => (
            <div
              className="plan-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {plans.map((plan, index) => (
                <Draggable
                  key={plan.id.toString()}
                  draggableId={plan.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`plan-item ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                    >
                      <PlanListItem
                        title={plan.title} // Use the correct fields from DatePlan
                        description={plan.description}
                        date={plan.date}
                        onClick={() => handleItemClick(plan)}
                      />
                      <img
                        src={plan.liked ? Favorite_Red : Favorite_Gray}
                        alt="Favorite"
                        className="favorite-icon"
                        onClick={() => handleToggleLike(plan.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isModalOpen && (
        <EditPlanModal
          data={modalData}
          onClose={closeModal}
          fetchDatePlans={fetchDatePlans}
        ></EditPlanModal>
      )}
      <div className="add-plan-container" onClick={handleAddPlan}>
        <AddPlan /> {/* Add Plan 버튼 */}
      </div>
    </div>
  );
};

export default PlanListAPI;
