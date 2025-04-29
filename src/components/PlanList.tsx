import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import EditPlanModal from "./EditPlan/EditPlanModal";
import PlanListItem from "./PlanListItem"; // Figma에서 변환한 Plan 컴포넌트
import AddPlan from "./AddPlan"; // Add Plan 버튼 컴포넌트
import "./PlanList.css"; // 추가적인 스타일 적용
import Favorite_Gray from "../assets/icons/Favorite_Gray.svg";
import Favorite_Red from "../assets/icons/Favorite_Red.svg";

interface PlanItem {
  id: string;
  content: string;
  liked: boolean;
  image: string;
}

const PlanList: React.FC = () => {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [modalData, setModalData] = useState<PlanItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedPlans = JSON.parse(
      localStorage.getItem("plans") || "[]"
    ) as PlanItem[];
    setPlans(storedPlans);
  }, []);

  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);

  const handleAddPlan = () => {
    const newPlan: PlanItem = {
      id: `plan-${plans.length + 1}`,
      content: `New Date Plan ${plans.length + 1}`,
      liked: false,
      image: Favorite_Gray,
    };
    setPlans([...plans, newPlan]);
  };

  const handleItemClick = (plan: PlanItem) => {
    setModalData(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = (id: string) => {
    const newPlans = plans.filter((plan) => plan.id !== id);
    setPlans(newPlans);
  };

  const handleToggleLike = (id: string) => {
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

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

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
                <Draggable key={plan.id} draggableId={plan.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`plan-item ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                    >
                      {/* <PlanListItem
                        content={plan.content}
                        onClick={() => handleItemClick(plan)}
                      /> */}
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
      {/* {isModalOpen && (
        <EditPlanModal data={modalData} onClose={closeModal}></EditPlanModal>
      )} */}
      <div className="add-plan-container" onClick={handleAddPlan}>
        <AddPlan /> {/* Add Plan 버튼 */}
      </div>
    </div>
  );
};

export default PlanList;
