import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./PlanList.css";
import EditPlanModal from "./EditPlan/EditPlanModal"; // 모달 컴포넌트 가져오기
import AddPlan from "./AddPlan"; // 플랜 추가 버튼 컴포넌트

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

const PlanListAPI: React.FC = () => {
  const [plans, setPlans] = useState<DatePlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태
  const [modalData, setModalData] = useState<DatePlan | null>(null); // 모달에 넘길 데이터

  useEffect(() => {
    const fetchDatePlans = async () => {
      try {
        const response = await axios.get<DatePlan[]>(
          "http://43.201.61.229/api/date-plans/"
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching date plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatePlans();
  }, []);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(plans);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlans(items);
  };

  const openModal = (plan: DatePlan) => {
    setModalData(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleAddPlan = () => {
    // 새로운 플랜 추가 로직 구현
    console.log("플랜 추가 버튼 클릭됨");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="plan-list-container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="plans">
          {(provided) => (
            <div
              className="plan-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {plans.map((plan, index) => (
                <Draggable
                  key={plan.id}
                  draggableId={String(plan.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="plan-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => openModal(plan)} // 플랜 클릭 시 모달 열림
                    >
                      <div>
                        <h3>{plan.title}</h3>
                        <p>{plan.date}</p>
                        <p>{plan.description}</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* 모달이 열려있을 때 표시 */}
      {isModalOpen && (
        <EditPlanModal data={modalData} onClose={closeModal}></EditPlanModal>
      )}

      {/* 플랜 추가 버튼 */}
      <div className="add-plan-container" onClick={handleAddPlan}>
        <AddPlan />
      </div>
    </div>
  );
};

export default PlanListAPI;
