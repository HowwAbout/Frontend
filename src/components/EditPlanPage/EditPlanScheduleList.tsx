import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditPlanScheduleItem from "./EditPlanScheduleItem";
import "./EditPlanScheduleList.css";
import AddSchedule from "./AddSchedule";
import AddScheduleModalDelete from "../AddScheduleModal/AddScheduleModal_Delete";

interface EditPlanScheduleItemProps {
  id: number;
  title: string;
  durationTime: string;
  description: string;
  location: string;
}

interface EditPlanScheduleListProps {
  items: EditPlanScheduleItemProps[];
  datePlan: DatePlan;
  addActivity: () => void;
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

const EditPlanScheduleList: React.FC<EditPlanScheduleListProps> = ({
  datePlan,
  items,
  addActivity,
}) => {
  const [schedules, setSchedules] = useState<EditPlanScheduleItemProps[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    id: number;
    title: string;
    location: string;
    durationTime: string;
    description: string;
  } | null>(null);

  const [updatedDatePlan, setUpdatedDatePlan] = useState<DatePlan | null>(
    datePlan
  );

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedPlans = JSON.parse(
      localStorage.getItem("plans") || "[]"
    ) as EditPlanScheduleItemProps[];
    setSchedules(storedPlans);
  }, []);

  const fetchData = async (): Promise<DatePlan | null> => {
    try {
      const response = await axios.get(
        `https://assemblytown.com/api/date-plans/${datePlan.id}`
      );
      setUpdatedDatePlan(response.data); // Update state with fetched datePlan data
      return response.data;
    } catch (error) {
      console.error("Error fetching the updated date plan:", error);
      return null;
    }
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setSchedules(reorderedItems);
  };

  const handleItemClick = (schedule: EditPlanScheduleItemProps) => {
    setModalData({
      id: schedule.id,
      title: schedule.title,
      location: schedule.location,
      durationTime: schedule.durationTime,
      description: schedule.description,
    });
    setModalOpen(true);
  };

  const closeModal = async () => {
    setModalOpen(false);
    setModalData(null);

    // Fetch updated data and refresh the page
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

      setSchedules(updatedItems); // Update the schedules with the new data
      navigate("/editplan_page", { state: { datePlan: updatedPlan } }); // Refresh page with updated data
    }
  };

  const OpenAddModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="editplanschedule-list">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="editplanschedule-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((schedule, index) => (
                <Draggable
                  key={schedule.id}
                  draggableId={schedule.id.toString()}
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
                      <EditPlanScheduleItem
                        title={schedule.title}
                        durationTime={schedule.durationTime}
                        description={schedule.description}
                        onClick={() => handleItemClick(schedule)}
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
      <AddSchedule onClick={addActivity} />
      {isModalOpen && modalData && (
        <AddScheduleModalDelete
          dateActivityResponse={modalData}
          onClose={closeModal}
          datePlanId={datePlan.id}
        />
      )}
    </div>
  );
};

export default EditPlanScheduleList;
